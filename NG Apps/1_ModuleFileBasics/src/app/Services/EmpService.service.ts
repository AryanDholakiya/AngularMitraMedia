import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpServiceService {
  constructor() {}

  setMinId(id: number) {
    return localStorage.setItem('MinEmpId', id.toString());
  }
  getMinId() {
    return Number(localStorage.getItem('MinEmpId'));
  }

  setMaxId(id: number) {
    return localStorage.setItem('MaxEmpId', id.toString());
  }
  getMaxId() {
    return Number(localStorage.getItem('MaxEmpId'));
  }

  //service example with api call and use of Observable:
  private client = inject(HttpClient);

  callApi(): Observable<any[]> {
    return this.client.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }
}
