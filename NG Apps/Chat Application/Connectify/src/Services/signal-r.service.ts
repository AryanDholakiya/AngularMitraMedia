import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/SignalR';
import { Sender } from '../app/interfaces/sender';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  recievedMessage = new BehaviorSubject<Sender>({ sender: '', message: '' });
  RecivedMessage$ = this.recievedMessage.asObservable();

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7132/connectify')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SingnalR started!'))
      .catch((e) => console.log(e));
  }

  RecieveMessage() {
    this.hubConnection.on('RecieveMessage', (msg: Sender) => {
      this.recievedMessage.next(msg);
    });
  }
}
