import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AboutComponent } from './components/about/about.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [AdminComponent, AboutComponent, CoursesComponent, HomeComponent, CoursesComponent],
  imports: [CommonModule, HomeRoutingModule, RouterModule, FormsModule],
})
export class HomeModule { }
