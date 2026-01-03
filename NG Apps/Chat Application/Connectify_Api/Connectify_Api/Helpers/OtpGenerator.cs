namespace Connectify_Api.Helpers
{
    public class OtpGenerator
    {
        public static string GenerateOtp()
        {
            Random random = new Random();
            return random.Next(100000, 999999).ToString();
        }
    }
}
