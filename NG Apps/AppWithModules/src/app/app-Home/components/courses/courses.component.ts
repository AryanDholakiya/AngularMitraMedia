import { Component, inject, Input, OnDestroy } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnDestroy {
  @Input() coursess: any[] = [];
  @Input() isAdmin: boolean = false;
  coursesSub!: Subscription; //--->unsubscribe krva mate---> memoryleak no problem na aave te mate
  // @Output() del = new EventEmitter();

  //service Injection;
  // constructor(private  courseService: CourseService){

  // }

  private courseService = inject(CourseService);

  ngOnInit() {

    this.coursess = this.courseService.getcourses(); //serrvive na getCourses() mathi aavse data

    //delete functionality: //subscription to show the records
    this.coursesSub = this.courseService.courses.subscribe({
      next: (courses: any[]) => {
        this.coursess = courses
        console.log("courses: ", this.coursess);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  deleteCourse(course: any) {
    if (this.isAdmin) {
      // this.del.emit(course);
      this.courseService.deleteCourse(course);
    }
  }

  ngOnDestroy() {
    if (this.coursesSub) {
      console.log('Unsubscribed on destroy.')
      this.coursesSub.unsubscribe();
    }
  }
}
