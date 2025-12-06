import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { COURSE } from '../models';
import { Strings } from '../../../enum/strings.enum';

@Component({
  selector: 'app-home',
  // standalone:true,  //bydefault true
  imports: [CoursesComponent],
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
    this.getcourses();
  }

  private router = inject(Router);

  navigate() {
    this.router.navigate(['about']);
  }

  courses: COURSE[] = [];

  getcourses() {
    //jetla save 6 already ene btava...aa func ngOnInIt ma muki do etle direct call thy jai
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    console.log(data);
    if (data) {
      this.courses = JSON.parse(data);
    }
  }
}
