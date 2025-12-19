import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { COURSE } from '../models';
import { Strings } from '../../../enum/strings.enum';
import { AboutComponent } from '../about/about.component';
import { CourseService } from '../../../services/course/course.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  // standalone:true,  //bydefault true
  imports: [CoursesComponent, AboutComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // //basically export means that this class is public we can use/import it anywhere.
  // title = 'StandAlone Demo';
  // constructor() {
  //   console.log('this is constructor!');
  // }
  // ngOnInit(): void {
  //   console.log('this is ngOnInit!');
  //   // this.changetitle();
  // }
  // changetitle() {
  //   this.title = 'Latest';
  // }

  ngOnInit() {
    // this.getcourses(); // aa hve courses compo ts ma j handle thy chhe

    this.fetchHttpData();
  }

  private router = inject(Router);

  navigate() {
    this.router.navigate(['about']);
  }

  // courses: COURSE[] = [];
  // private courseService = inject(CourseService);

  // getcourses() {
  //   //jetla save 6 already ene btava...aa func ngOnInIt ma muki do etle direct call thy jai
  //   const data = localStorage.getItem(Strings.STORAGE_KEY);
  //   // console.log(data);
  //   if (data) {
  //     this.courses = JSON.parse(data);
  //   }
  // }

  private client = inject(HttpClient);

  async fetchHttpData() {
    //   this.client.get('https://jsonplaceholder.typicode.com/posts').subscribe({
    //     next: (posts) => {
    //       console.log(posts);
    //     },
    //     error: (e) => {
    //       console.log(e);
    //     },
    //   });
    //upper ahi memoryLeak issue avi ske because we used "subscribe". --> to aapne tene unsubscribe pn kravvo pde //ex : courses.compo.ts ma "ngOnDestroy" ma 103 no ni line

    //another method: async await is neccessary for below method bcz lastvalue() promise return krse.
    try {
      const posts = await lastValueFrom(
        this.client.get<any>('https://jsonplaceholder.typicode.com/posts')
      );
      console.log(posts);
    } catch (e) {
      console.log(e);
    }
  }
}
