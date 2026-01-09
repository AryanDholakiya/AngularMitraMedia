import { Component, inject } from '@angular/core';
import { UiStateService } from '../../../../Services/ChatPage Services/ui-state.service';

@Component({
  selector: 'app-left-sidebar',
  standalone: false,
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss',
})
export class LeftSidebarComponent {
  private uistate = inject(UiStateService);

  openChats() {
    this.uistate.setView('chat-list');
  }
  openSettings() {
    this.uistate.setView('settings');
  }
  openProfile() {
    this.uistate.setView('profile');
  }
}
