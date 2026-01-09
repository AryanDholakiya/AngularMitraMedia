import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveChat } from '../../app/interfaces/active-chat';

@Injectable({
  providedIn: 'root',
})
export class ChatStateService {
  private activeChatSubject = new BehaviorSubject<ActiveChat | null>(null);
  activeChat$ = this.activeChatSubject.asObservable();

  setActiveChat(chat: ActiveChat) {
    this.activeChatSubject.next(chat);
  }
  clearChat() {
    this.activeChatSubject.next(null);
  }
}
