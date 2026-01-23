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
  isSeen?: boolean;
  attachment?: string | null;
  attachmentName?: string;
  attachmentType?: string;
}
