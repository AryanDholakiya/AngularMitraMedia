import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChatStateService } from '../Services/ChatPage Services/chat-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Connectify';

  private router = inject(Router);
  private activatedUserChat = inject(ChatStateService);

  //if localstorage will clear , directly user will redirect to the Login page
  @HostListener('window:storage', ['$event'])
  onLocalStorageChange(event: StorageEvent) {
    if (
      event.key === 'loggedIn_User' ||
      event.key === 'userId' ||
      event.key === null
    ) {
      this.activatedUserChat.clearChat(); //when user login , right-chat-panel will not open with last messaged person

      const User = localStorage.getItem('loggedIn_User');
      const UserId = localStorage.getItem('userId');

      if (!User && !UserId) {
        this.router.navigateByUrl('/Login');
      }
    }
  }
}
