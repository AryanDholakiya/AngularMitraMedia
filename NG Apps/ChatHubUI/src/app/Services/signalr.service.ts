import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { Messages } from '../interfaces/messages';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection!: signalR.HubConnection;

  recieveMessage = new BehaviorSubject<Messages>({ message: '', userName: '' });
  recieveMessage$ = this.recieveMessage.asObservable();

  constructor() {}

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7268/chatHUb')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('signalR Started!'))
      .catch((e) => console.log(e));
  }

  RecieveMessages() {
    this.hubConnection.on('RecieveMessage', (msg: Messages) => {
      this.recieveMessage.next(msg);
    });
  }
}
