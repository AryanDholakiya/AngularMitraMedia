import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: `<div> Learning ng!</div>`,
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AppWithModules';
}
