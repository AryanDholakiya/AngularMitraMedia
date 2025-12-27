import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentDataService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedin$ = this.isLoggedIn.asObservable(); //logout setup

  private apiUrl = 'https://localhost:7171/api/StudentApi';

  constructor(private client: HttpClient) {}

  getStudent(): Observable<Student[]> {
    return this.client.get<Student[]>(`${this.apiUrl}/AllStudents`);
  }

  AddStudent(data: Student): Observable<Student> {
    return this.client.post<Student>(`${this.apiUrl}/Add_Student`, data);
  }

  EditStudent(id: number, studentdata: Student): Observable<Student> {
    return this.client.put<Student>(
      `${this.apiUrl}/Edit_Student/${id}`,
      studentdata
    );
  }
  DeleteStudent(id: number): Observable<string> {
    return this.client.delete(`${this.apiUrl}/DeleteStudent/${id}`, {
      responseType: 'text',
    });
  }

  login(data: { UserName: string; Password: string }) {
    return this.client.post<any>('https://localhost:7171/api/JWT/login', data);
  }

  //register thse tyare aa api call thse
  AddTeacher(data: { UserName: string; Password: string }) {
    return this.client.post<any>(
      'https://localhost:7171/api/JWT/Add_Teacher',
      data
    );
  }
}
