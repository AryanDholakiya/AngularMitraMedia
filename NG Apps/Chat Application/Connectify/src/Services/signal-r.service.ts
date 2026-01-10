import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Sender } from '../app/interfaces/sender';
import { BehaviorSubject } from 'rxjs';
import { RealtimeMessage } from '../app/interfaces/realtime-message';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  // private hubConnection!: signalR.HubConnection;
  // recievedMessage = new BehaviorSubject<Sender>({ sender: '', message: '' });
  // RecivedMessage$ = this.recievedMessage.asObservable();
  // startConnection() {
  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl('https://localhost:7132/connectify')
  //     .withAutomaticReconnect()
  //     .build();
  //   this.hubConnection
  //     .start()
  //     .then(() => console.log('SingnalR started!'))
  //     .catch((e) => console.log(e));
  // }
  // RecieveMessage() {
  //   this.hubConnection.on('ReceiveMessage', (msg: Sender) => {
  //     this.recievedMessage.next(msg);
  //   });
  // }

  private hubConnection!: signalR.HubConnection;

  private messageSubject = new BehaviorSubject<RealtimeMessage | null>(null);
  message$ = this.messageSubject.asObservable();

  startConnection(userId: number) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7132/connectify?userId=${userId}', {
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected as User:', userId))
      .catch((err) => console.error('SignalR Error:', err));

    this.receiveMessageListener();
  }

  private receiveMessageListener() {
    this.hubConnection.on('ReceiveMessage', (data: RealtimeMessage) => {
      this.messageSubject.next(data);
    });
  }

  sendMessage(data: RealtimeMessage) {
    this.hubConnection.invoke('SendMessage', data).catch((err) => {
      console.error('Send error:', err);
    });
  }

  stopConnection() {
    this.hubConnection.stop();
  }
}
