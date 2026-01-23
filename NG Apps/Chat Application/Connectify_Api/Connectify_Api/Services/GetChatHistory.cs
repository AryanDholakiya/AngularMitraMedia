using Connectify_Api.Models;
using Connectify_Api.Repositories;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Reflection.PortableExecutable;

namespace Connectify_Api.Services
{
    public class GetChatHistory: IGetChatHistoryAsync
    {
        private readonly SqlConnection _connection;

        public GetChatHistory(IConfiguration config)
        {
            _connection = new SqlConnection(config.GetConnectionString("DefaultConnection"));
        }

        public async Task<List<Message>> GetChatHistoryAsync(int userId, int chatUserId)
        {
            var messages = new List<Message>();
            try
            {
                using SqlCommand cmd = new SqlCommand("sp_GetChatHistory",_connection);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UserId", userId);
                cmd.Parameters.AddWithValue("@ChatUserId", chatUserId);

                await _connection.OpenAsync();

                var reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    messages.Add(new Message
                    {
                        MessageId = reader.GetInt32(0),
                        SenderId = reader.GetInt32(1),
                        ReceiverId = reader.GetInt32(2),
                        Content = reader.IsDBNull(3) ? null : reader.GetString(3),
                        SentAt = reader.GetDateTime(4),
                        IsDelivered = reader.GetBoolean(5),
                        IsSeen = reader.GetBoolean(6),
                        Attachment = reader["Attachment"] == DBNull.Value ? null : Convert.ToBase64String((byte[])reader["Attachment"]),
                        AttachmentName = reader.IsDBNull(8) ? null : reader.GetString(8),
                        AttachmentType = reader.IsDBNull(9) ? null : reader.GetString(9)

                    });
                }

                await _connection.CloseAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
           
            return messages;
        }

    }
}
