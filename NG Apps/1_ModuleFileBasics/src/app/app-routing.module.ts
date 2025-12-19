import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { ChildComponent } from './components/Input Decorator/child/child.component';
import { ParentComponent } from './components/Input Decorator/parent/parent.component';
import { Child1Component } from './components/Output Decorator/child1/child1.component';
import { Parent1Component } from './components/Output Decorator/parent1/parent1.component';
import { ObservablesComponent } from './components/observables/observables.component';
import { ServiceImplementComponent } from './components/service-implement/service-implement.component';
import { TemplatedDrivenComponent } from './components/Forms/templated-driven/templated-driven.component';
import { ReactiveComponent } from './components/Forms/reactive/reactive.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeRouteCompoComponent } from './components/RouteConcept/home-route-compo/home-route-compo.component';
import { EmployeesListComponent } from './components/RouteConcept/employees-list/employees-list.component';
import { EmployeeDetailComponent } from './components/RouteConcept/employee-detail/employee-detail.component';
import { CoursesComponent } from './components/RouteConcept/courses/courses.component';
import { CourseDetailsComponent } from './components/RouteConcept/course-details/course-details.component';

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
    path: 'pipes',
    component: PipesComponent,
  },
  {
    path: 'child',
    component: ChildComponent,
  },
  {
    path: 'parent',
    component: ParentComponent,
  },
  {
    path: 'child1',
    component: Child1Component,
  },
  {
    path: 'parent1',
    component: Parent1Component,
  },
  {
    path: 'observables',
    component: ObservablesComponent,
  },
  {
    path: 'Service_Example',
    component: ServiceImplementComponent,
  },
  {
    path: 'TemplateDrivenForm',
    component: TemplatedDrivenComponent,
  },
  {
    path: 'ReactiveForm',
    component: ReactiveComponent,
  },
  {
    path: 'RoutingUnderstanding',
    component: HomeRouteCompoComponent,
    // children: [
    //   {
    //     path: 'Courses',
    //     component: CoursesComponent,
    //   },
    // ],
  },
  {
    path: 'Employees-List',
    component: EmployeesListComponent,
  },
  {
    path: 'Employees-List/:id',
    component: EmployeeDetailComponent,
  },
  {
    path: 'Courses',
    component: CoursesComponent,
  },
  {
    path: 'Course-details',
    outlet: 'course_details', //same name which we given in router-outlet "name"
    component: CourseDetailsComponent,
  },
  {
    path: '**', // ALWAYS PUT THIS INTO THE END.. AFTER ALL THE ROUTES
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
