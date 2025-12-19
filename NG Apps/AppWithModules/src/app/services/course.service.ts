import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../interfaces/course.interface';
import { Strings } from '../enum/strings.enum';

// import { Course } from '../../interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses$ = new BehaviorSubject<Course[]>([]); //([]) means initial value : BehaviorSubject() ma initial value aapvi frjiyat chhe etle apne ahi null array pass krr didho.

  get courses() {
    return this.courses$.asObservable();
  }

  getcourses() {
    //jetla save 6 already ene btava...aa func ngOnInIt ma muki do etle direct call thy jai: in courses.compo.ts
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    // console.log(data);
    if (data) {
      const courses = JSON.parse(data);
      // return courses;
      this.updateCourses(courses); //next function observalble ni value ne update krr dese //bdha courses ni values mlse aaama.
      return courses;
    }
    // return [];
  }

  //addCourse
  addCourse(data: Course) {
    const courses = this.courses$.value; //how to get values which is inside BehaviorSubject()
    const newCourses = [...courses, { ...data, id: courses.length + 1 }];
    this.updateCourses(newCourses);

    //save in localStorage:
    this.setDataInLocal(newCourses);

    return newCourses;
  }

  updateCourses(data: Course[]) {
    //every change pr reflect kravvanu chhe aane.
    this.courses$.next(data);
  }

  //deleteCourse functionality:

  deleteCourse(data: Course) {
    let courses = this.courses$.value;
    courses = courses.filter((course_name) => course_name.id != data.id);
    this.updateCourses(courses);
    this.setDataInLocal(courses);
  }

  setDataInLocal(data: Course[]) {
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(data));
  }
}
