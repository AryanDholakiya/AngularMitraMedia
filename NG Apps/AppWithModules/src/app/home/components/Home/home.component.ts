import { Component, inject, OnInit } from '@angular/core';
import { Route, Router,RouterLink } from '@angular/router';

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
  }

  changetitle() {
    this.title = 'Home Component';
  }

  //types of routerLink: that how can we use different ways to navigate to another page.
  // Actually if we want to use the "navigate" then we have to inject it route first //there is 2 types of injection

  // constructor(private router: Router) {}
  private router = inject(Router);

  navigateRoute() {
    this.router.navigate(['/about']);
  }
}
