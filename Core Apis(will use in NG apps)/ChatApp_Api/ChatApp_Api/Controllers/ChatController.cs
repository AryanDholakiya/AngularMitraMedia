using ChatApp_Api.Hubs;
using ChatApp_Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ChatApp_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<chatHub> _hub;

        public ChatController(IHubContext<chatHub> hub)
        {
            _hub = hub;
        }

        [HttpPost]
        [Route("send")]
        public async Task<IActionResult> send(SendMessage sendMessage)
        {
            await _hub.Clients.All.SendAsync("RecieveMessage",sendMessage);
            return Ok(new{message = "Sent Successfully" });
        }
    }
}
