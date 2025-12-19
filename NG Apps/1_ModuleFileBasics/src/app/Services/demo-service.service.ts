import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemoServiceService {
  constructor() {}

  students: any[] = [
    { name: 'akash', rollno: 1, age: 22 },
    { name: 'anjali', rollno: 2, age: 25 },
    { name: 'Gitanjali', rollno: 3, age: 26 },
    { name: 'naganajali', rollno: 4, age: 24 },
  ];

  getStudents() {
    // debugger;
    return this.students;
  }

  //service example with api call and use of Observable:
  private client = inject(HttpClient);

  callApi(): Observable<any[]> {
    return this.client.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }
}
