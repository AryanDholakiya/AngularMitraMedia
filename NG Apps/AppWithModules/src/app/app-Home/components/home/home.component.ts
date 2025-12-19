import { Component, inject, OnInit } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { Course } from '../../../interfaces/course.interface';
import { Strings } from '../../../enum/strings.enum';
import { CourseService } from '../../../services/course.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  title = 'HomeCompo';

  ngOnInit(): void {
    // this.changetitle();

    this.fetchHttpData();
  }

  changetitle() {
    this.title = 'Home Component';
  }

  //types of routerLink: that how can we use different ways to navigate to another page.
  // Actually if we want to use the "navigate" then we have to inject it route first //there is 2 types of injection

  private route = inject(Router);
  navigateRoute() {
    this.route.navigate(['/about']);
  }

  private courseService = inject(CourseService);

  courses: Course[] = [];

  getcourses() {
    //jetla save 6 already ene btava...aa func ngOnInIt ma muki do etle direct call thy jai
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    console.log(data);
    if (data) {
      this.courses = JSON.parse(data);
    }
  }

  private client = inject(HttpClient);

  fetchHttpData() {
    this.client.get('https://jsonplaceholder.typicode.com/posts').subscribe({
      next: (posts) => {
        console.log(posts);
      },
      error(e) {
        console.log(e);
      },
    });
  }
}
