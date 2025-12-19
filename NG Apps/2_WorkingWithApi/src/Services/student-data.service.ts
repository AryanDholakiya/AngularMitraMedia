import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentDataService {
  private apiUrl = 'https://localhost:7171/api/StudentApi';

  constructor(private client: HttpClient) {}

  getStudent(): Observable<Student[]> {
    return this.client.get<Student[]>(`${this.apiUrl}/AllStudents`);
  }

  AddStudent(student: Student): Observable<Student> {
    return this.client.post<Student>(`${this.apiUrl}/Add_Student`, student);
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
}
