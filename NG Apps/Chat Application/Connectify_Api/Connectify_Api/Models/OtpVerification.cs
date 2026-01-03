namespace Connectify_Api.Models
{
    public class OtpVerification
    {
        public int OtpId { get; set; }
        public string Email { get; set; }
        public string OtpCode { get; set; }
        public DateTime ExpiryTime { get; set; }
        public bool IsUsed { get; set; }
    }
}
