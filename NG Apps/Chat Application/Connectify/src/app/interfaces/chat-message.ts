export interface ChatMessage {
  // id: number;
  // text: string;
  // isMe: boolean;
  // time: string;

  messageId: number;
  senderId: number;
  receiverId: number;
  content: string;
  sentAt: string;
  isMe: boolean;
}
