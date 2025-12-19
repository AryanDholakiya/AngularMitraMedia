import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';

export const app_home_routes: Routes = [
  //we must have to export it because aa aapsu to j "app.routes.ts" ma refrence js
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./components/courses/courses.component').then(
        (c) => c.CoursesComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (c) => c.AboutComponent
      ),
  },
  {
    path: 'about/:id',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (c) => c.AboutComponent
      ),
  },
  {
    path: 'admin',
    // component: AdminComponent,
    loadComponent: () =>
      import('./components/admin/admin.component').then(
        (c) => c.AdminComponent
      ),
  },
];
