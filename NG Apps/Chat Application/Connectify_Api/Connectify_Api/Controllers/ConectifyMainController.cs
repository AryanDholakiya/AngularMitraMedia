using Connectify_Api.DTOs;
using Connectify_Api.Helpers;
using Connectify_Api.Hubs;
using Connectify_Api.Models;
using Connectify_Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Reflection.PortableExecutable;

namespace Connectify_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConectifyMainController : ControllerBase
    {
        private readonly IHubContext<ChatsHub> _hub;
        private readonly EmailService _emailService;
        private readonly IConfiguration _config;

        public ConectifyMainController(IConfiguration config, IHubContext<ChatsHub> hub, EmailService emailService)
        {
            _hub = hub;
            _emailService = emailService;
            _config = config;
        }


        //Signalr message sending
        //[HttpPost]
        //[Route("Send")]
        //public async Task<IActionResult> send(SendMessageRequest user)
        //{
        //    await _hub.Clients.All.SendAsync("ReceiveMessage", user);
        //    return Ok(new { status = "Message Sent" });
        //}

        [HttpPost]
        [Route("send-otp")]
        public async Task<IActionResult> sendOtp(RegistrationRequest request)
        {
            using SqlConnection Conn = new SqlConnection(_config.GetConnectionString("DefaultConnection"));//don't forget there is 'using' keyword

            await Conn.OpenAsync();
            using (SqlCommand CheckUserCmd = new SqlCommand("sp_UserExist", Conn))
            {
                CheckUserCmd.CommandType = System.Data.CommandType.StoredProcedure;//don't forget to add this
                CheckUserCmd.Parameters.AddWithValue("@MobileNumber", request.MobileNumber);

                var exists = (int?)await CheckUserCmd.ExecuteScalarAsync(); // ExecuteScalarAsync aa tyare j vprai jyare aapne khbr hoi k sp mathi return value only 1 (single value) j aavse. //ExecuteScalar ડિફોલ્ટ રીતે ડેટાને object તરીકે આપે છે jene integer ma convert krva (int) mukvu pde. 
                if (exists > 0)
                    return BadRequest(new { Status = "User already Exist!" });
            }

            string otp = OtpGenerator.GenerateOtp();
            DateTime expirey = DateTime.UtcNow.AddMinutes(5);

            using (SqlCommand cmd = new SqlCommand("sp_saveOtp", Conn))
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Email", request.Email);
                cmd.Parameters.AddWithValue("@MobileNumber", request.MobileNumber);
                cmd.Parameters.AddWithValue("@Otp", otp);
                cmd.Parameters.AddWithValue("@Expiry", expirey);

                cmd.ExecuteNonQuery();
            }
            await _emailService.SendOtpEmail(request.Email, otp);
            return Ok(new { Status = "Otp Sent Successfully!" });
        }


        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            using SqlConnection conn =
                new SqlConnection(_config.GetConnectionString("DefaultConnection"));

            await conn.OpenAsync();

            // 1-- Get OTP record
            SqlCommand validateCmd = new SqlCommand("sp_ValidateOtp", conn);
            validateCmd.CommandType = CommandType.StoredProcedure;

            validateCmd.Parameters.AddWithValue("@Email", request.Email);
            validateCmd.Parameters.AddWithValue("@MobileNumber", request.MobileNumber);
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


            // 2-- Insert user
            SqlCommand registerCmd = new SqlCommand("sp_RegisterUser", conn);
            registerCmd.CommandType = CommandType.StoredProcedure;

            registerCmd.Parameters.AddWithValue("@CountryCode", request.CountryCode);
            registerCmd.Parameters.AddWithValue("@MobileNumber", request.MobileNumber);
            registerCmd.Parameters.AddWithValue("@Email", request.Email);
            registerCmd.Parameters.AddWithValue("@OtpId", otpId);

            //await registerCmd.ExecuteNonQueryAsync();
            var result = await registerCmd.ExecuteScalarAsync(); //profile

            return Ok(new {
                message = "Registration successful",
                userId = result
            });
        }




        //Login 

        [HttpPost("Login-otp")]
        public async Task<IActionResult> LoginSendOtp(LoginOtpRequest request)
        {
            string? email = "";
            using SqlConnection conn = new SqlConnection(_config.GetConnectionString("DefaultConnection"));

            await conn.OpenAsync();
            using (SqlCommand cmd = new SqlCommand("sp_LoginSendOtp", conn))
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;//don't forget to add this

                cmd.Parameters.AddWithValue("@MobileNumber", request.mobileNumber);

                email = (string?)await cmd.ExecuteScalarAsync();
            }

            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new { message = "User not registered" });
            }
               
            string otp = OtpGenerator.GenerateOtp();
            DateTime expirey = DateTime.UtcNow.AddMinutes(5);

            using (SqlCommand cmd = new SqlCommand("sp_saveOtp", conn))
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;//don't forget to add this

                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@MobileNumber", request.mobileNumber);
                cmd.Parameters.AddWithValue("@Otp", otp);
                cmd.Parameters.AddWithValue("@Expiry", expirey);

                cmd.ExecuteNonQuery();
            }
            await _emailService.SendOtpEmail(email, otp);

            return Ok(new { message = "otp sent successful" });
        }


        [HttpPost("verify-Login-otp")]
        public async Task<IActionResult> VerifyLoginOtp([FromBody] LoginOtpRequest request)
        {
            using SqlConnection conn =
                 new SqlConnection(_config.GetConnectionString("DefaultConnection"));

            await conn.OpenAsync();

            // 1-- Get OTP record
            SqlCommand validateCmd = new SqlCommand("sp_ValidateOtp", conn);
            validateCmd.CommandType = CommandType.StoredProcedure;

            validateCmd.Parameters.AddWithValue("@Email", null);
            validateCmd.Parameters.AddWithValue("@MobileNumber", request.mobileNumber); 
            validateCmd.Parameters.AddWithValue("@OtpCode", request.LoginOtp);

            SqlDataReader reader = await validateCmd.ExecuteReaderAsync();

            if (!reader.HasRows)
                return BadRequest(new { message = "Invalid OTP" });

            await reader.ReadAsync();

            DateTime expiry = reader.GetDateTime(reader.GetOrdinal("ExpiryTime"));
            int otpId = reader.GetInt32(reader.GetOrdinal("OtpId"));
            int userId = reader.GetInt32(reader.GetOrdinal("userId"));
            string email = reader.GetString(reader.GetOrdinal("Email"));
            //reader.GetOrdinal("OtpId"): કોલમનું નામ શોધી તેનો ઇન્ડેક્સ નંબર આપે છે
            //reader.GetInt32(reader.GetOrdinal("OtpId")): ચોક્કસ પ્રકારનો ડેટા ખેંચે છે GetOrdinal thi mlela number no.

            if (expiry < DateTime.UtcNow)
                return BadRequest(new { message = "OTP expired" });

            await reader.CloseAsync();

            using (SqlCommand cmd = new SqlCommand("sp_OtpUsed", conn))
            {
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@OtpCode", request.LoginOtp);
                await cmd.ExecuteNonQueryAsync();
            }
            return Ok(new { message = "Login successful", userId = userId, email = email });
        }



        //for profile page
        [HttpPost("update-profile")]
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateProfileRequest request)
        {
            byte[]? imageBytes = null;

            if (request.ProfileImage != null)
            {
                using var ms = new MemoryStream();
                await request.ProfileImage.CopyToAsync(ms);
                imageBytes = ms.ToArray();
            }

            using SqlConnection conn = new SqlConnection(
                _config.GetConnectionString("DefaultConnection"));
            await conn.OpenAsync();

            SqlCommand cmd = new SqlCommand("sp_UpdateUserProfile", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UserId", request.UserId);
            cmd.Parameters.AddWithValue("@Username", request.Username);
            cmd.Parameters.AddWithValue("@About", request.About);
            cmd.Parameters.Add("@ProfileImage", SqlDbType.VarBinary).Value =
                (object?)imageBytes ?? DBNull.Value;

            await cmd.ExecuteNonQueryAsync();

            return Ok(new { message = "Profile updated successfully", isProfileCompleted = true });
        }

        [HttpGet("get-profile/{userId}")]
        public async Task<IActionResult> GetMyProfile(int userId)
        {
            using SqlConnection conn =
                new SqlConnection(_config.GetConnectionString("DefaultConnection"));

            await conn.OpenAsync();

            SqlCommand cmd = new SqlCommand("sp_GetUserProfile", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@UserId", userId);

            SqlDataReader reader = await cmd.ExecuteReaderAsync();
            await reader.ReadAsync();

            return Ok(new
            {
                userId,
                username = reader["Username"],
                about = reader["About"],
                profileImage = reader["ProfileImage"] == DBNull.Value
                    ? null
                    : Convert.ToBase64String((byte[])reader["ProfileImage"]),
                isProfileCompleted = reader["IsProfileCompleted"],
                Email = reader["Email"],
                CountryCode = reader["CountryCode"],
                MobileNumber = reader["MobileNumber"],
            });
        }
    }
}
