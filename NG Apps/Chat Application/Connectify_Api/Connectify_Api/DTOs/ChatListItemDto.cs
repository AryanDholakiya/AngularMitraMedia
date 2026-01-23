namespace Connectify_Api.DTOs
{
    public class ChatListItemDto
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string? ProfileImage { get; set; }
        public string LastMessage { get; set; }
        public DateTime LastMessageTime { get; set; }
        public string? attachmentName { get; set; }
    }
}
