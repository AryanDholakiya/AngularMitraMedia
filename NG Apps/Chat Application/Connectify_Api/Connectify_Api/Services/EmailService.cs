using System.Net;
using System.Net.Mail;

namespace Connectify_Api.Services
{
    public class EmailService
    {
        public async Task SendOtpEmail(string toEmail, string otp)
        {
            var message = new MailMessage();
            message.From = new MailAddress("prajapati08.aryan@gmail.com", "Aryan");
            message.To.Add(toEmail);
            message.Subject = "Connectify - Email Verification Code";
            message.Body = $"Your verification code is: {otp}";
            message.IsBodyHtml = false;

            using var smtp = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("prajapati08.aryan@gmail.com", "iiiu hrms ferl tkmt"),
                EnableSsl = true
            };

            await smtp.SendMailAsync(message);
        }
    }
}
