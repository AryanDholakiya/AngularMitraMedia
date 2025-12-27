import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './Components/students/students.component';
import { studentResolver } from '../resolvers/student.resolver';
import { HomeComponent } from './Components/home/home.component';
import { RegistrationPageComponent } from './Components/registration-page/registration-login-page.component';
import { authGuardGuard } from './Guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegistrationPageComponent,
  },
  {
    path: 'login',
    component: RegistrationPageComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [authGuardGuard],
    resolve: {
      students: studentResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
