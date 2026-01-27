import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private IsDarkTheme = new BehaviorSubject<boolean>(false);
  IsDarkTheme$ = this.IsDarkTheme.asObservable();

  loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

  toggleTheme(themeChange: boolean) {
    debugger;
    this.IsDarkTheme.next(themeChange);
    document.body.classList.toggle('dark-theme', themeChange);
    localStorage.setItem('theme', themeChange ? 'dark' : 'light');
  }
}
