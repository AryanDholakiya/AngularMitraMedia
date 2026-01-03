import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDataService } from '../../../Services/student-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration-page',
  standalone: false,
  templateUrl: './registration-login-page.component.html',
  styleUrl: './registration-login-page.component.css',
})
export class RegistrationPageComponent implements OnInit {
  isRegisterMode = false;
  ViewPass = false;
  UsernotFound = '';
  registerform = new FormGroup({
    UserName: new FormControl('', [Validators.required]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  private route = inject(ActivatedRoute);
  path = this.route.snapshot.url[0].path;

  constructor(private toaster: ToastrService) {}
  ngOnInit(): void {
    // console.log('Form value: ' + this.registerform.value);
    // આ લાઈન ચેક કરશે કે URL નો રસ્તો 'register' છે કે નહીં
    // snapshot.url[0].path આપણને 'register' અથવા 'login' આપશે
    if (this.path === 'register') {
      this.isRegisterMode = true;
    } else {
      this.isRegisterMode = false;
    }
  }

  //login using the jwt:
  private authService = inject(StudentDataService);
  // private route = inject(ActivatedRoute);
  private router = inject(Router);

  LoginMethod() {
    const data = {
      // TeacherId: 0,
      UserName: this.registerform.value.UserName ?? '', //Unique way
      Password: this.registerform.value.Password ?? '',
    };
    if (this.registerform.valid) {
      if (this.path === 'register') {
        this.authService.AddTeacher(data).subscribe({
          next: (res) => {
            console.log('add teacher api response: ', res);
            localStorage.setItem('token', res.token); //api response ne set krvo pdse pela bcz "students" ma route thya pela authguard check krse local storage ma token 6 k nai te
            this.router.navigateByUrl('/students');
            this.authService.isLoggedIn.next(true); // logout setup
            this.UsernotFound = '';

            //toaster
            localStorage.setItem('userName', res.userName);
            this.toaster.success(
              `${res.userName} Logged In`,
              'Registered Successfully!',
              {
                positionClass: 'toast-top-center',
                timeOut: 2000,
              }
            );
          },
          error: (e) => {
            console.log(e);
          },
        });
      } else {
        this.authService.login(data).subscribe({
          next: (res) => {
            // console.log(res.userName); //toaster ma show krva..NOTE kro k ma 'userName' avse "UserName" nai
            // console.log('User Authorized: ' + res.token);
            localStorage.setItem('token', res.token); //'token' --> aaj name localstorage.get('token') am vaprvanu
            localStorage.setItem('userName', res.userName); //logout time prr toaster ma username show krva
            this.router.navigateByUrl('/students');
            this.authService.isLoggedIn.next(true); // logout setup
            this.UsernotFound = '';

            this.toaster.success(
              `${res.userName} Logged In`,
              'Login Successfully!',
              {
                positionClass: 'toast-top-center',
                timeOut: 2000,
              }
            );
          },
          error: (e) => {
            this.UsernotFound = 'UserName or Password is Invalid, try again!';
            this.toaster.error(
              'UserName or Password is Invalid, try again!',
              'Login Failed!',
              {
                positionClass: 'toast-top-center',
                timeOut: 2000,
              }
            );
            // console.log('Invalid User: ' + e.message);
            // console.log('Invalid User: ' + e.error.title);
          },
        });
      }
    }
  }

  ViewPasswordFn() {
    this.ViewPass = !this.ViewPass;
  }
}
