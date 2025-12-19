import { ResolveFn } from '@angular/router';
import { Student } from '../interfaces/student.interface';
import { inject } from '@angular/core';
import { StudentDataService } from '../Services/student-data.service';
import { Observable } from 'rxjs';

export const studentResolver: ResolveFn<Student[]> = (route, state) => {
  const ser = inject(StudentDataService);

  return ser.getStudent();
  //aa rite ma observable mukvani mathakut nathi.. aa observable<student[]> type no data j mokle 6
  //direct service inject kro ane method call maro
};

// export class StudentResolver implements Resolve<Student[]> {  //uppr ni method function trike 6 aa as a class

//   constructor(private studentService: StudentDataService) {}

//   resolve(): Observable<Student[]> {
//     return this.studentService.getStudent();
//   }
// }
