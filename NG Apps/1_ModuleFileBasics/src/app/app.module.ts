import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { ExponentPowerPipe } from './Custom-Pipes/exponent-power.pipe';
import { ReversePipe } from './Custom-Pipes/reverse.pipe';
import { ChildComponent } from './components/Input Decorator/child/child.component';
import { ParentComponent } from './components/Input Decorator/parent/parent.component';
import { Child1Component } from './components/Output Decorator/child1/child1.component';
import { Parent1Component } from './components/Output Decorator/parent1/parent1.component';
import { ObservablesComponent } from './components/observables/observables.component';
import { ServiceImplementComponent } from './components/service-implement/service-implement.component';
import { provideHttpClient } from '@angular/common/http';
import { TemplatedDrivenComponent } from './components/Forms/templated-driven/templated-driven.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponent } from './components/Forms/reactive/reactive.component';
import { HighlightDirective } from './Custom-Directives/highlight.directive';
import { BgColorDirective } from './Custom-Directives/bg-color.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeRouteCompoComponent } from './components/RouteConcept/home-route-compo/home-route-compo.component';
import { EmployeesListComponent } from './components/RouteConcept/employees-list/employees-list.component';
import { EmployeeDetailComponent } from './components/RouteConcept/employee-detail/employee-detail.component';
import { CoursesComponent } from './components/RouteConcept/courses/courses.component';
import { CourseDetailsComponent } from './components/RouteConcept/course-details/course-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProgressBarComponent,
    PipesComponent,
    ExponentPowerPipe,
    ReversePipe,
    ChildComponent,
    ParentComponent,
    Child1Component,
    Parent1Component,
    ObservablesComponent,
    ServiceImplementComponent,
    TemplatedDrivenComponent,
    ReactiveComponent,
    HighlightDirective,
    BgColorDirective,
    PageNotFoundComponent,
    HomeRouteCompoComponent,
    EmployeesListComponent,
    EmployeeDetailComponent,
    CoursesComponent,
    CourseDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
