import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './Components/students/students.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, StudentsComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, CommonModule],
  providers: [provideHttpClient()], //need to use the httpClient for Api integration
  bootstrap: [AppComponent],
})
export class AppModule {}
