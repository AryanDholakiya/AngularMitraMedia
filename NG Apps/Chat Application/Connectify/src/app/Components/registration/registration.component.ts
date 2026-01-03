import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: false,
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  Connectify_Registration = new FormGroup({
    countryCode: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
      Validators.maxLength(10),
    ]),
    UserEmail: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      // always pass the regex only not with the string, if you want to add the string in it then: we have to do like this: Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]),
  });

  //registration: prevent user to add the char in field
  onlyNumber(event: any) {
    // debugger;
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
    // debugger;
    //NOTE: event.stopPropagation() : event must be of type Event
    event.stopPropagation(); //parent ni event fire nai thva dese hve
    this.Connectify_Registration.get('countryCode')?.setValue(country.code);
    this.selectedCountry = country;
    this.isDropdownOpen = false;
  }

  SubmitRegiForm() {
    if (this.Connectify_Registration.invalid) {
      this.Connectify_Registration.markAllAsTouched();
    }
  }
}
