import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApicallService {
  private client = inject(HttpClient); //do " providers: [provideHttpClient()] " in app.module.ts

  sendMessage() {
    debugger;
    return this.client.get('https://localhost:7141/api/Chating/send');
  }
}
