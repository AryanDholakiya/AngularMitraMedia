import { Component, Input } from '@angular/core';
import { COURSE } from '../models';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  @Input() coursess?: COURSE;
  @Input() isDelete?: boolean = false;
}
