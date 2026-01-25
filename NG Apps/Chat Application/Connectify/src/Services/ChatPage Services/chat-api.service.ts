import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatMessage } from '../../app/interfaces/chat-message';
import { RealtimeMessage } from '../../app/interfaces/realtime-message';
import { ChatItem } from '../../app/interfaces/chat-item';
import { MessageSeen } from '../../app/interfaces/message-seen';

@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  private baseUrl = 'https://localhost:7132/api/Chat';

  constructor(private http: HttpClient) {}

  getChatHistory(userId: number, chatUserId: number) {
    return this.http.get<ChatMessage[]>(
      `${this.baseUrl}/history?userId=${userId}&chatUserId=${chatUserId}`
    );
  }

  SendaMessage(data: FormData) {
    return this.http.post(`${this.baseUrl}/send`, data);
  }
  MessageSeen(data: MessageSeen) {
    // debugger;
    return this.http.post(`${this.baseUrl}/MessageSeen`, data);
  }

  GetChatList(userId: number) {
    // debugger;
    return this.http.get<ChatItem[]>(`${this.baseUrl}/list?userId=${userId}`);
  }
}
