import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type MiddleView = 'chat-list' | 'profile' | 'settings';

@Injectable({
  providedIn: 'root',
})
export class UiStateService {
  private middleViewSubject = new BehaviorSubject<MiddleView>('chat-list');
  middleView$ = this.middleViewSubject.asObservable();

  setView(view: MiddleView) {
    this.middleViewSubject.next(view);
  }

  private selectedChatUserSubject = new BehaviorSubject<number | null>(null);
  selectedChatUser$ = this.selectedChatUserSubject.asObservable();

  setSelectedChatUser(userId: number) {
    this.selectedChatUserSubject.next(userId);
  }
}
