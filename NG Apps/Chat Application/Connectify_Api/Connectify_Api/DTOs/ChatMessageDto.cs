namespace Connectify_Api.DTOs
{
    public class ChatMessageDto
    {
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string Message { get; set; }
        public string Time { get; set; }
    }
}
