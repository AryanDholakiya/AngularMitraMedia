using Connectify_Api.DTOs;
using Microsoft.AspNetCore.SignalR;

namespace Connectify_Api.Hubs
{
    public class ChatsHub : Hub
    {
        private static Dictionary<int, string> UserConnections = new();

        public override async Task OnConnectedAsync()
        {
            var userId = Context.GetHttpContext()?.Request.Query["userId"];

            //if (!string.IsNullOrEmpty(userId))
            //{
            //    int uid = int.Parse(userId);
            //    UserConnections[uid] = Context.ConnectionId;
            //}
            if (!string.IsNullOrEmpty(userId))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, userId);
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            //var item = UserConnections.FirstOrDefault(x => x.Value == Context.ConnectionId);
            var userId = Context.GetHttpContext()?.Request.Query["userId"];
            //if (item.Key != 0)
            //{
            //    UserConnections.Remove(item.Key);
            //}
            if (!string.IsNullOrEmpty(userId))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, userId);
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(ChatMessageDto message)
        {
            if (UserConnections.TryGetValue(message.ReceiverId, out string? receiverConnectionId))
            {
                await Clients.Client(receiverConnectionId)
                    .SendAsync("ReceiveMessage", message);
            }
        }
    }
}
