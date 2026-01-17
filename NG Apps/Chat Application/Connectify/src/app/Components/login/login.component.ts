import { Component, inject, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../Services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private apiService = inject(ApiServiceService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  SendOtp: boolean = false;

  ngOnInit(): void {
    // const Signed_User = JSON.parse(
    //   localStorage.getItem('loggedIn_User') || '{}'
    // );
    // if (Signed_User) {
    //   console.log(Signed_User);
    //   this.LoggedUser_email = Signed_User.email;
    //   this.Connectify_Login.get('email')?.setValue(Signed_User.email);
    //   console.log('LoggedIn user email: ', Signed_User.email);
    // }
  }

  Connectify_Login = new FormGroup({
    countryCode: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
      Validators.maxLength(10),
    ]),
    LoginOtp: new FormControl(''),
  });

  onlyNumber(event: any) {
    let pressedKey = event.key;
    const pattern = /[0-9]/;
    if (!pattern.test(pressedKey)) {
      event.preventDefault();
    }
  }

  //format email text:
  formatEmail(email: string) {
    const getFourChar = email.slice(0, 3);
    const end = email.indexOf('@');
    return getFourChar + '******' + email.slice(end);
  }

  countries = [
    {
      name: 'India',
      code: '+91',
      flag: 'assets/india.png',
    },
    {
      name: 'USA',
      code: '+1',
      flag: 'assets/usa.png',
    },
  ];
  selectedCountry: any = null;
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCountry(event: Event, country: any) {
    event.stopPropagation(); //parent ni event fire nai thva dese hve
    this.Connectify_Login.get('countryCode')?.setValue(country.code);
    this.selectedCountry = country;
    this.isDropdownOpen = false;
  }

  VerifyLogin() {
    // debugger;
    if (this.Connectify_Login.invalid) {
      this.Connectify_Login.markAllAsTouched();
      return;
    }
    if (!this.SendOtp) {
      // debugger;
      this.apiService.sendLoginOtp(this.Connectify_Login.value).subscribe({
        next: (res: any) => {
          // comes here only if status code 200 cames from Backend
          this.toastr.success(res.message);
          this.SendOtp = true;
        },
        error: (e) => {
          //if backend returns Badrequest.
          this.toastr.error(e.error.message);
        },
      });
    } else {
      // debugger;
      this.apiService.verifyLoginOtp(this.Connectify_Login.value).subscribe({
        next: (res: any) => {
          debugger;
          console.log('response after login: ', res);
          localStorage.setItem('userId', res.userId);
          this.toastr.success(res.message);
          this.SendOtp = false;

          localStorage.setItem(
            //authGuard mate
            'loggedIn_User',
            JSON.stringify({
              email: res.email,
              mobileNumber: this.Connectify_Login.value.mobileNumber,
              countryCode: this.Connectify_Login.value.countryCode,
            }),
          );

          this.router.navigate(['/SendMessage']);
        },
        error: (e) => {
          this.toastr.error(e.error.message);
        },
      });
    }
  }
}
