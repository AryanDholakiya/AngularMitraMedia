import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'Home',
  //   component: HomeComponent,
  // },
  // {
  //   path: 'About',
  //   component: AboutComponent,
  // },
  // {
  //   path: 'About/:id',
  //   component: AboutComponent,
  // },
  //Below routes shows the lazyloading concepts

  {
    path: '',
    loadChildren: () =>
      import('./app-Home/app-home-routing').then((m) => m.app_home_routes), //aa vstu krva mate "app-home-routing.ts" ma aggal "export" aapevu pde.
  },
];
