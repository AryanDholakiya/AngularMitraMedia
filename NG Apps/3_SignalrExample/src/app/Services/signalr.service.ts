import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  anything = new BehaviorSubject<string>('');
  anythingObs$ = this.anything.asObservable();

  private hubConnection!: signalR.HubConnection;

  startConnection() {
    debugger;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7141/notificationHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('signalR Connected!'))
      .catch((e) => console.log(e));
  }

  // recieveMsg(messages: (msg: string) => void) {
  //   debugger;
  //   this.hubConnection.on('ReceiveMessage', messages);
  // }
  recieveMsg() {
    this.hubConnection.on('ReceiveMessage', (data) => {
      this.anything.next(data);
    });
  }
}
