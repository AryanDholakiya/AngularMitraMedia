import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './Components/students/students.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './Components/registration-page/registration-login-page.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { authinterceptorInterceptor } from './interceptor/authinterceptor.interceptor';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    RegistrationPageComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([authinterceptorInterceptor])),
    provideToastr(),
  ], //need to use the httpClient for Api integration
  // provideHttpClient(withInterceptors([authinterceptorInterceptor])) : is for the interceptor
  // provideAnimations() and  provideToastr() is for the Toaster
  bootstrap: [AppComponent],
})
export class AppModule {}
