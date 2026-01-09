import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MiddleView,
  UiStateService,
} from '../../../../Services/ChatPage Services/ui-state.service';

@Component({
  selector: 'app-middle-panel',
  standalone: false,
  templateUrl: './middle-panel.component.html',
  styleUrl: './middle-panel.component.scss',
})
export class MiddlePanelComponent {
  view$: Observable<MiddleView>;
  constructor(private uiState: UiStateService) {
    this.view$ = this.uiState.middleView$;
  }
}
