using Connectify_Api.Helpers;
using Connectify_Api.Hubs;
using Connectify_Api.Models;
using Connectify_Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Connectify_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConectifyMainController : ControllerBase
    {
        private readonly IHubContext<ChatsHub> _hub;
        private readonly EmailService _emailService;
        private readonly IConfiguration _config;

        public ConectifyMainController(IConfiguration config,IHubContext<ChatsHub> hub, EmailService emailService)
        {
            _hub = hub;
            _emailService = emailService;
            _config = config;
        }


        [HttpPost]
        [Route("Send")]
        public async Task<IActionResult> send(User user)
        {
            await _hub.Clients.All.SendAsync("RecieveMessage", user);
            return Ok(new { status = "Message Sent" });
        }

        [HttpPost]
        [Route("send-otp")]
        public async Task<IActionResult> sendOtp(RegistrationRequest request)
        {
            string otp = OtpGenerator.GenerateOtp();
            DateTime expirey = DateTime.UtcNow.AddMinutes(5);

            using SqlConnection Conn = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            SqlCommand cmd = new SqlCommand("sp_saveOtp", Conn);
            cmd.CommandType=System.Data.CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Email", request.Email);
            cmd.Parameters.AddWithValue("@Otp", otp);
            cmd.Parameters.AddWithValue("@Expiry", expirey);

            await  Conn.OpenAsync();
            cmd.ExecuteNonQuery();

            await _emailService.SendOtpEmail(request.Email, otp);


            return Ok(new { Status = "Otp Sent Successfully!" });
        }

        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            using SqlConnection conn =
                new SqlConnection(_config.GetConnectionString("DefaultConnection"));

            await conn.OpenAsync();

            // 1. Get OTP record
            SqlCommand validateCmd = new SqlCommand("sp_ValidateOtp", conn);
            validateCmd.CommandType = CommandType.StoredProcedure;

            validateCmd.Parameters.AddWithValue("@Email", request.Email);
            validateCmd.Parameters.AddWithValue("@OtpCode", request.OtpCode);

            SqlDataReader reader = await validateCmd.ExecuteReaderAsync();

            if (!reader.HasRows)
                return BadRequest("Invalid OTP");

            await reader.ReadAsync();

            DateTime expiry = reader.GetDateTime(reader.GetOrdinal("ExpiryTime"));
            int otpId = reader.GetInt32(reader.GetOrdinal("OtpId"));

            if (expiry < DateTime.UtcNow)
                return BadRequest("OTP expired");

            await reader.CloseAsync();


            // 2. Insert user
            SqlCommand registerCmd = new SqlCommand("sp_RegisterUser", conn);
            registerCmd.CommandType = CommandType.StoredProcedure;

            registerCmd.Parameters.AddWithValue("@CountryCode", request.CountryCode);
            registerCmd.Parameters.AddWithValue("@MobileNumber", request.MobileNumber);
            registerCmd.Parameters.AddWithValue("@Email", request.Email);
            registerCmd.Parameters.AddWithValue("@OtpId", otpId);

            await registerCmd.ExecuteNonQueryAsync();


            return Ok(new { message = "Registration successful" });
        }

    }
}
