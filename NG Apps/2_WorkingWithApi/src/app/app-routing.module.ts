import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './Components/students/students.component';
import { studentResolver } from '../resolvers/student.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/students',
    pathMatch: 'full',
  },
  {
    path: 'students',
    component: StudentsComponent,
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
