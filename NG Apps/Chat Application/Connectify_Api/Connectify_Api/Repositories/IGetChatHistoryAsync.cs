using Connectify_Api.Models;

namespace Connectify_Api.Repositories
{
    public interface IGetChatHistoryAsync
    {
        Task<List<Message>> GetChatHistoryAsync(int userId, int chatUserId);

    }
}
