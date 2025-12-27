using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace _1_Simple_Crud_Api_forNg_.Hubs
{
    [Authorize]
    public class StudentHub : Hub
    {
        //public async Task NotifyStudentChanged()
        //{
        //    await Clients.All.SendAsync("StudentChanged");
        //}
    }
}
