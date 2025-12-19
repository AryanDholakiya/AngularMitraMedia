import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  standalone: false,
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent {
  private router = inject(Router);

  GoBack() {
    this.router.navigate([{ outlets: { course_details: null } }]);
  }
}
