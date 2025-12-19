import {
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Input,
  OnDestroy,
  Output,
  SecurityContext,
  signal,
} from '@angular/core';
import { COURSE } from '../models';
import { Course } from '../../../interfaces/course.interface';
import { Strings } from '../../../enum/strings.enum';
import { CourseService } from '../../../services/course/course.service';
import { Subscription } from 'rxjs';
// import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnDestroy {
  // coursess: any[] = [];
  coursess = signal<Course[]>([]); // changed into the signal

  // @Input() isAdmin: boolean = false;
  isAdmin = input<boolean>(false); //type define krvo is not neccessary
  coursesSub!: Subscription; //--->unsubscribe krva mate---> memoryleak no problem na aave te mate
  // @Output() del = new EventEmitter();

  //service Injection;
  // constructor(private  courseService: CourseService){

  // }

  private courseService = inject(CourseService);

  //understand why we use signals:
  //without signals:
  a = 2;
  b = 3;
  c = this.a + this.b;

  withoutSignalEx() {
    console.log('C before value of a change: ', this.c);
    this.a = 10;
    console.log('C after value of a change: ', this.c);
  }

  //with signal
  A1 = signal(10);
  B1 = signal(20);
  C1 = computed(() => this.A1() + this.B1()); //"computed" is Readonly signal type swhich contains the callback(arrow fn)

  withSignalEx() {
    console.log('C1 before value of A1 change: ', this.C1());
    this.A1.set(100);
    console.log('C1 after value of A1 change: ', this.C1());
  }

  ngOnInit() {
    this.withoutSignalEx();
    this.withSignalEx();
    // If coursess not passed from parent → load from local storage
    // if (!this.coursess || this.coursess.length === 0) {
    //   const data = localStorage.getItem(Strings.STORAGE_KEY);
    //   if (data) {
    //     this.coursess = JSON.parse(data);
    //   }
    // }

    // this.coursess = this.courseService.getcourses(); //service na getCourses() mathi aavse data
    ////bcz of signal it should be changed
    this.coursess.set(this.courseService.getcourses()); //service na getCourses() mathi aavse data

    //delete functionality: //subscription to show the records
    this.coursesSub = this.courseService.courses.subscribe({
      next: (courses) => {
        // this.coursess = courses;  //bcz of signal it should be changed
        this.coursess.set(courses);
        console.log('courses: ', this.coursess()); // "this.coursess()" changed to "this.coursess()" bcz of signal
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  deleteCourse(course: any) {
    if (this.isAdmin()) {
      // "this.isAdmin" is changed to --> "this.isAdmin()" bcz we make it input signal
      // this.del.emit(course);
      this.courseService.deleteCourse(course);
    }
  }

  ngOnDestroy() {
    if (this.coursesSub) {
      console.log('Unsubscribed on destroy.');
      this.coursesSub.unsubscribe();
    }
  }

  //image sanitization ni error solve krva : actually we don't need it
  // private sanitizer = inject(DomSanitizer);

  // sanitizeUrl(value: string) {
  //   return this.sanitizer.sanitize(SecurityContext.URL, value) || null;
  // }
}
