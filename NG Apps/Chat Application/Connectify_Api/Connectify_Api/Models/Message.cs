namespace Connectify_Api.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string? Content { get; set; }
        public DateTime SentAt { get; set; }
        public bool IsDelivered { get; set; }
        public bool IsSeen { get; set; }
        public string? Attachment { get; set; }
        public string? AttachmentName { get; set; }
        public string? AttachmentType { get; set; }

    }
}
