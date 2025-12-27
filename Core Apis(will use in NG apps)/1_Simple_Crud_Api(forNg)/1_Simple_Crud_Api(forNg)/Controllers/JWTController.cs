using _1_Simple_Crud_Api_forNg_.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace _1_Simple_Crud_Api_forNg_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JWTController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly StudentsContext _context;

        public JWTController(IConfiguration config, StudentsContext context)
        {
            _config = config;
            _context = context;
        }

        private object GenerateJwtToken(string userName)//this is our payload//Note the object here.
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // ક્લેમ્સ (Payload) ઉમેરો
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userName),
                new Claim(ClaimTypes.Name, userName),
                //new Claim(ClaimTypes.Role, "User") // રોલ ઉમેર્યો
            };

            // ટોકન ડિસ્ક્રિપ્ટર બનાવો
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1), // 1 કલાકમાં સમાપ્ત
                signingCredentials: credentials);

            // ટોકન પરત કરો
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost]
        [Route("login")]
        public IActionResult login([FromBody] TeacherDto dto)
        {
            var user = _context.Teachers.FirstOrDefault(u => u.UserName == dto.UserName && u.Password == dto.Password);

            if (user == null)
            {
                return Unauthorized();
            }
            var tokenString = GenerateJwtToken(dto.UserName);
            //Console.WriteLine(tokenString);
            return Ok(new { token = tokenString, UserName = dto.UserName });
        }


        [HttpPost] 
        [Route("Add_Teacher")]
        public async Task<IActionResult> AddTeacher(Teacher teacher)
        {
            await _context.Teachers.AddAsync(teacher);
            await _context.SaveChangesAsync();
            var tokenString = GenerateJwtToken(teacher.UserName);
           
            return Ok(new { token = tokenString, TeacherId = teacher.TeacherId, UserName = teacher.UserName, Password = teacher.Password });
        }
    }
}
