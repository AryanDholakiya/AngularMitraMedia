namespace Connectify_Api.Models
{
    public class VerifyOtpRequest
    {
        public string CountryCode { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string OtpCode { get; set; }
    }
}
