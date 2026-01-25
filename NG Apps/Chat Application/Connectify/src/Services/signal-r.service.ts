import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { RealtimeMessage } from '../app/interfaces/realtime-message';
import { MessageSeen } from '../app/interfaces/message-seen';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  private messageSubject = new BehaviorSubject<RealtimeMessage | null>(null);
  message$ = this.messageSubject.asObservable();

  startConnection(userId: number) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7132/connectify?userId=${userId}`, {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected as User:', userId))
      .catch((err) => console.error('SignalR Error:', err));

    this.receiveMessageListener();
    this.MessageSeenListener();
  }

  private receiveMessageListener() {
    this.hubConnection.on('ReceiveMessage', (data: RealtimeMessage) => {
      this.messageSubject.next(data);
    });
  }

  private SeenmessageSubject = new BehaviorSubject<MessageSeen | null>(null);
  Seenmessage$ = this.SeenmessageSubject.asObservable();

  private MessageSeenListener() {
    this.hubConnection.on('MessageSeen', (data: MessageSeen) => {
      this.SeenmessageSubject.next(data);
    });
  }

  stopConnection() {
    this.hubConnection.stop();
  }
}
