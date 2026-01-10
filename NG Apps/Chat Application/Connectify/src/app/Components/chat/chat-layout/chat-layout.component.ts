import { Component, inject, OnInit } from '@angular/core';
import { SignalRService } from '../../../../Services/signal-r.service';

@Component({
  selector: 'app-chat-layout',
  standalone: false,
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent implements OnInit {
  private signalR = inject(SignalRService);

  ngOnInit() {
    const loggedInUserId = 1;
    this.signalR.startConnection(loggedInUserId);
  }
}
