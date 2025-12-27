using Microsoft.AspNetCore.SignalR;

namespace SignalR_practice_Api.Hubs
{
    public class chatHub : Hub
    {
        public async Task sendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
