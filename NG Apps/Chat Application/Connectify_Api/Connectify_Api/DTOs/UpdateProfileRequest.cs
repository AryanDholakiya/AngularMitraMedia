namespace Connectify_Api.DTOs
{
    public class UpdateProfileRequest //for profile page
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string? About { get; set; }
        public string? Email { get; set; }
        public IFormFile? ProfileImage { get; set; }
    }
}
