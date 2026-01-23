using Connectify_Api.DTOs;
using Connectify_Api.Models;

namespace Connectify_Api.Repositories
{
    public interface IMessageService
    {
        Task<Message> SaveMessageAsync(SendMessageDto dto);
        Task<bool> MessageSeen(IsMessageSeen dto);
    }
}
