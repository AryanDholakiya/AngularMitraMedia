export interface RealtimeMessage {
  messageId: number;
  senderId: number;
  receiverId: number;
  message: string;
  time: string;
  content: string;
  attachment: string | null;
  attachmentType: string;
  attachmentName: string;
}
