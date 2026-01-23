using Azure.Core;
using Connectify_Api.DTOs;
using Connectify_Api.Models;
using Connectify_Api.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Connectify_Api.Services
{
    public class MessageService : IMessageService   
    {
        private readonly SqlConnection _connection;

        public MessageService(IConfiguration config)
        {
           _connection = new SqlConnection(
           config.GetConnectionString("DefaultConnection"));
        }

        public async Task<Message> SaveMessageAsync(SendMessageDto dto)
        {
            using SqlCommand cmd = new SqlCommand("sp_InsertMessage", _connection);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;

            byte[]? fileBytes = null;
            string? fileName = null;
            string? fileType = null;

            if (dto.Attachment != null)
            {
                using var ms = new MemoryStream();
                await dto.Attachment.CopyToAsync(ms);
                fileBytes = ms.ToArray();

                fileName = dto.Attachment.FileName;
                fileType = dto.Attachment.ContentType;
            }


            cmd.Parameters.AddWithValue("@SenderId", dto.SenderId);
            cmd.Parameters.AddWithValue("@ReceiverId", dto.ReceiverId);
            cmd.Parameters.AddWithValue("@Content", dto.Content ?? null);

            cmd.Parameters.Add("@Attachment", SqlDbType.VarBinary).Value =
            (object?)fileBytes ?? DBNull.Value;
            cmd.Parameters.AddWithValue("@AttachmentName", fileName ?? (object)DBNull.Value);
            cmd.Parameters.AddWithValue("@AttachmentType", fileType ?? (object)DBNull.Value);

            await _connection.OpenAsync();

            var reader = await cmd.ExecuteReaderAsync();

            Message message = null;

            if(await reader.ReadAsync())
            {
                message = new Message()
                {
                    MessageId = reader.GetInt32(0),
                    SenderId = reader.GetInt32(1),
                    ReceiverId = reader.GetInt32(2),
                    Content = reader.IsDBNull(3) ?null:reader.GetString(3),
                    SentAt = reader.GetDateTime(4),
                    IsDelivered = reader.GetBoolean(5),
                    IsSeen = reader.GetBoolean(6),
                    Attachment = reader.IsDBNull(7)
                        ? null
                        : Convert.ToBase64String((byte[])reader["Attachment"]),
                    AttachmentName = reader.IsDBNull(8) ? null : reader.GetString(8),
                    AttachmentType = reader.IsDBNull(9) ? null : reader.GetString(9)
                };
            }

            await _connection.CloseAsync();
            return message;
        }


        public async Task<bool> MessageSeen(IsMessageSeen dto)
        {
            using SqlCommand cmd = new SqlCommand("messageSeen",_connection);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;

            await _connection.OpenAsync();

            cmd.Parameters.AddWithValue("@SenderId", dto.SenderId);
            cmd.Parameters.AddWithValue("@ReceiverId", dto.ReceiverId);

           await cmd.ExecuteNonQueryAsync();



            await _connection.CloseAsync();
            return true;
        }
    }
}
