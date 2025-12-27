import { Component, inject, OnInit } from '@angular/core';
import { SignalrService } from '../../Services/signalr.service';
import { ApicallService } from '../../Services/apicall.service';

@Component({
  selector: 'app-signal-r',
  standalone: false,
  templateUrl: './signal-r.component.html',
  styleUrl: './signal-r.component.css',
})
export class SignalRComponent implements OnInit {
  message = '';

  private signalR = inject(SignalrService);
  private apiCall = inject(ApicallService);

  ngOnInit(): void {
    this.signalR.startConnection();
    this.signalR.recieveMsg();

    // this.signalR.recieveMsg((msg) => {
    //   debugger;
    //   this.message = msg;
    // });

    this.signalR.anythingObs$.subscribe((data) => {
      // console.log(data);
      this.message = data;
    });
  }
  send() {
    this.apiCall.sendMessage().subscribe();
  }
}
