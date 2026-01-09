import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveChat } from '../../../interfaces/active-chat';
import { ChatStateService } from '../../../../Services/ChatPage Services/chat-state.service';

@Component({
  selector: 'app-right-chat-panel',
  standalone: false,
  templateUrl: './right-chat-panel.component.html',
  styleUrl: './right-chat-panel.component.scss',
})
export class RightChatPanelComponent {
  activatedChat$: Observable<ActiveChat | null>;

  constructor(private chatState: ChatStateService) {
    this.activatedChat$ = this.chatState.activeChat$;
  }
}
