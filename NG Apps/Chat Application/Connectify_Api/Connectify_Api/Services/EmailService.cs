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
            message.Body = $@"
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset='UTF-8'>
              <title>Connectify OTP</title>
            </head>
            <body style='font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;'>

              <div style='max-width: 500px; margin: auto; background: #ffffff; border-radius: 8px; padding: 24px;'>

                <h2 style='color: #2ca73c; text-align: center;'>Connectify</h2>

                <p>Hello,</p>

                <p>
                  Thank you for registering with <strong>Connectify</strong>.
                  Please use the verification code below to complete your registration.
                </p>

                <div style='text-align: center; margin: 30px 0;'>
                  <span style='font-size: 32px; letter-spacing: 6px; font-weight: bold; color: #000;'>
                    {otp}
                  </span>
                </div>

                <p>
                  This code is valid for <strong>5 minutes</strong>.
                  Please do not share this code with anyone.
                </p>

                <p style='margin-top: 30px;'>
                  Regards,<br />
                  <strong>Connectify Team</strong>
                </p>

                <hr style='margin-top: 40px;' />

                <p style='font-size: 12px; color: #888; text-align: center;'>
                  If you did not request this, please ignore this email.
                </p>

              </div>

            </body>
            </html>";

            message.IsBodyHtml = true; //html add krva we need to add this.

            using var smtp = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("prajapati08.aryan@gmail.com", "iiiu hrms ferl tkmt"),
                EnableSsl = true
            };

            await smtp.SendMailAsync(message);
        }
    }
}
