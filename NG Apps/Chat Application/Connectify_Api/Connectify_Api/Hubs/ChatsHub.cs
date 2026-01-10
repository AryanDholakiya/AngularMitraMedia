using Microsoft.AspNetCore.SignalR;

namespace Connectify_Api.Hubs
{
    public class ChatsHub : Hub
    {
        private static Dictionary<int, string> UserConnections = new();

        public override async Task OnConnectedAsync()
        {
            var userId = Context.GetHttpContext()?.Request.Query["userId"];

            if (!string.IsNullOrEmpty(userId))
            {
                int uid = int.Parse(userId);
                UserConnections[uid] = Context.ConnectionId;
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var item = UserConnections.FirstOrDefault(x => x.Value == Context.ConnectionId);
            if (item.Key != 0)
            {
                UserConnections.Remove(item.Key);
            }

            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(ChatMessageDto message)
        {
            if (UserConnections.TryGetValue(message.ReceiverId, out string receiverConnectionId))
            {
                await Clients.Client(receiverConnectionId)
                    .SendAsync("ReceiveMessage", message);
            }
        }
    }
}
