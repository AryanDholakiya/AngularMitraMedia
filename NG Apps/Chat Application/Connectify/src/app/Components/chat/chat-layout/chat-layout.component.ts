import { Component, inject, OnInit } from '@angular/core';
import { SignalRService } from '../../../../Services/signal-r.service';
import { CurrentUserService } from '../../../../Services/ChatPage Services/current-user.service';
import { ThemeService } from '../../../../Services/theme.service';

@Component({
  selector: 'app-chat-layout',
  standalone: false,
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent implements OnInit {
  private signalR = inject(SignalRService);
  private currentUser = inject(CurrentUserService);
  private Mode = inject(ThemeService);

  ngOnInit() {
    // const loggedInUserId = 1;
    const user = this.currentUser.getCurrentUser();
    if (!user) return;

    const loggedInUserId = user.userId;
    this.signalR.startConnection(loggedInUserId);

    this.Mode.IsDarkTheme$.subscribe(() => {
      this.Mode.loadTheme();
    });
  }
}
