import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class StudentSignalrService {
  private hubConnection!: signalR.HubConnection;

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7171/studentHub', {
        accessTokenFactory: () => {
          return localStorage.getItem('token') || '';
        },
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start();
  }

  onStudentChanged(callback: (data: any) => void) {
    this.hubConnection.on('StudentChanged', callback);
  }
  onStudentDeleted(callback: (data: number) => void) {
    this.hubConnection.on('Studentdeleted', callback);
  }
}
