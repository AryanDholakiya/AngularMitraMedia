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
}
