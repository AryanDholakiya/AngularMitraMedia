using Connectify_Api.DTOs;
using Connectify_Api.Hubs;
using Connectify_Api.Repositories;
using Connectify_Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Connectify_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IMessageService _messageService;
        private readonly IHubContext<ChatsHub> _hub;
        private readonly IGetChatHistoryAsync _getChathistory;
        private readonly IConfiguration _config;

        public ChatController(IMessageService messageService, IHubContext<ChatsHub> hub, IGetChatHistoryAsync getChathistory, IConfiguration config)
        {
            _messageService = messageService;
            _hub = hub;
            _getChathistory = getChathistory;
            _config = config;
        }

        //Signalr message sending
        [HttpPost("send")]
        public async Task<IActionResult> SendMessage(SendMessageDto dto)
        {
            var savedMessage = await _messageService.SaveMessageAsync(dto);

            await _hub.Clients
                .All
                .SendAsync("ReceiveMessage", savedMessage);

            return Ok(savedMessage);
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetChatHistoryAsync([FromQuery] int userId,[FromQuery] int chatUserId)
        {
            var messages = await _getChathistory.GetChatHistoryAsync(userId, chatUserId);
            return Ok(messages);
        }


        [HttpGet("list")]
        public async Task<IActionResult> GetChatList([FromQuery]int userId) 
        {
            List<ChatListItemDto> chats = new();

            using SqlConnection conn =
                new SqlConnection(_config.GetConnectionString("DefaultConnection"));

            await conn.OpenAsync();

            SqlCommand cmd = new SqlCommand("sp_GetChatList", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserId", userId);

            SqlDataReader reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                chats.Add(new ChatListItemDto
                {
                    UserId = reader.GetInt32(0),
                    Username = reader.GetString(1),
                    ProfileImage = reader.IsDBNull(2)
                        ? null
                        : Convert.ToBase64String((byte[])reader["ProfileImage"]),
                    LastMessage = reader.IsDBNull(3) ? null : reader.GetString(3),
                    LastMessageTime = reader.IsDBNull(4) ? DateTime.Now : reader.GetDateTime(4)
                });
            }

            return Ok(chats);
        }
    }
}
