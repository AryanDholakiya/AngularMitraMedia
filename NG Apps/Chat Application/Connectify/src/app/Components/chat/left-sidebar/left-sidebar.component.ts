import { Component, inject, OnInit } from '@angular/core';
import { UiStateService } from '../../../../Services/ChatPage Services/ui-state.service';
import { ApiServiceService } from '../../../../Services/api-service.service';
import { ThemeService } from '../../../../Services/theme.service';

@Component({
  selector: 'app-left-sidebar',
  standalone: false,
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent implements OnInit {
  private uistate = inject(UiStateService);
  private apiService = inject(ApiServiceService);
  private Mode = inject(ThemeService);

  LoggedInUserId: number = 0;
  LoggedUserProfileImg: string | null = null;

  currentActiveState: string = 'chat-list';

  ngOnInit() {
    this.Mode.IsDarkTheme$.subscribe(() => {
      this.Mode.loadTheme();
    });

    this.LoggedInUserId = Number(localStorage.getItem('userId'));
    console.log('LoggedInUserId from left sidebar: ', this.LoggedInUserId);

    this.apiService.getProfile(this.LoggedInUserId).subscribe({
      next: (res: any) => {
        console.log('response from the leftsidebar getprofile service:', res);
        this.LoggedUserProfileImg = res.profileImage;
        // console.log('img:', this.LoggedUserProfileImg);
      },
      error: (e) => {
        console.log('Error from the leftsidebar getprofile service:', e);
      },
    });
  }

  openChats() {
    this.uistate.setView('chat-list');
    this.currentActiveState = 'chat-list';
  }
  openSettings() {
    this.uistate.setView('settings');
    this.currentActiveState = 'settings';
  }
  AddContact() {
    this.uistate.setView('add-contact');
    this.currentActiveState = 'add-contact';
  }
  openProfile() {
    this.uistate.setView('profile');
    this.currentActiveState = 'profile';
  }
}
