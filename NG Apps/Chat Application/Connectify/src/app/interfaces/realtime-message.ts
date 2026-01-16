export interface RealtimeMessage {
  senderId: number;
  receiverId: number;
  message: string;
  time: string;
  content: string;
  attachment: string | null;
}
