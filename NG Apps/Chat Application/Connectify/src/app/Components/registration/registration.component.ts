import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiServiceService } from '../../../Services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  private apiService = inject(ApiServiceService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  Connectify_Registration = new FormGroup({
    countryCode: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      // always pass the regex only not with the string, if you want to add the string in it then: we have to do like this: Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]),
  });

  //registration: prevent user to add the char in field
  onlyNumber(event: any) {
    let pressedKey = event.key;
    const pattern = /[0-9]/;
    if (!pattern.test(pressedKey)) {
      event.preventDefault();
    }
  }

  //dropdown for country and its flag
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
    //NOTE: event.stopPropagation() : event must be of type Event
    event.stopPropagation(); //parent ni event fire nai thva dese hve
    this.Connectify_Registration.get('countryCode')?.setValue(country.code);
    this.selectedCountry = country;
    this.isDropdownOpen = false;
  }

  SubmitRegiForm() {
    // debugger;
    if (this.Connectify_Registration.invalid) {
      this.Connectify_Registration.markAllAsTouched();
      return;
    }

    this.apiService.sendOtp(this.Connectify_Registration.value).subscribe({
      next: (res: any) => {
        debugger;
        console.log(res);
        localStorage.setItem(
          'loggedIn_User',
          JSON.stringify({
            email: res.email,
            mobileNumber: res.mobileNumber,
            CountryCode: res.countryCode,
          }),
        );
        const storedData = localStorage.getItem('loggedIn_User');
        console.log('storedData: ', storedData);
        this.router.navigate(['/Verify-Otp'], {
          queryParams: {
            // countryCode: this.Connectify_Registration.value.countryCode,
            // mobileNumber: this.Connectify_Registration.value.mobileNumber,
            // email: this.Connectify_Registration.value.email,
            countryCode: res.countryCode,
            mobileNumber: res.mobileNumber,
            email: res.email,
          },
        });
      },
      error: (e) => {
        console.log(e);
        this.toastr.error(e.error.status);
      },
    });
  }
}
