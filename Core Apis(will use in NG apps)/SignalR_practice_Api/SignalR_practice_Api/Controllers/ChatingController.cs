using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR_practice_Api.Hubs;

namespace SignalR_practice_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatingController : ControllerBase
    {
        private readonly IHubContext<chatHub> _hub;

        public ChatingController(IHubContext<chatHub> hub)
        {
            _hub = hub;
        }

        [HttpGet]
        [Route("send")]
        public async Task<IActionResult> Send()
        {
            await _hub.Clients.All.SendAsync("ReceiveMessage", "Hello from the server");
            return Ok();
        }
    }
}
