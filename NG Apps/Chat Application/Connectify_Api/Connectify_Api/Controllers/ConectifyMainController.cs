using Connectify_Api.Hubs;
using Connectify_Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Connectify_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConectifyMainController : ControllerBase
    {
        private readonly IHubContext<ChatsHub> _hub;

        public ConectifyMainController(IHubContext<ChatsHub> hub)
        {
            _hub = hub;
        }


        [HttpPost]
        [Route("Send")]
        public async Task<IActionResult> send(User user)
        {
            await _hub.Clients.All.SendAsync("RecieveMessage", user);
            return Ok(new { status = "Message Sent" });
        }
    }
}
