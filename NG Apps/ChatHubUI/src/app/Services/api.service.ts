import { inject, Injectable } from '@angular/core';
import { Messages } from '../interfaces/messages';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private client = inject(HttpClient);

  send(formdata: Messages) {
    return this.client.post('https://localhost:7268/api/Chat/send', formdata);
  }
}
