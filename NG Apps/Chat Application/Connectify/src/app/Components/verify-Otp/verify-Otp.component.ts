import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiServiceService } from '../../../Services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-Otp',
  standalone: false,
  templateUrl: './verify-Otp.component.html',
  styleUrl: './verify-Otp.component.scss',
})
export class VerifyOtpComponent {
  email!: string;
  countryCode!: string;
  mobileNumber!: string;
  timeLeft = 300; // 5 minutes
  timerInterval: any;

  otpForm = new FormGroup({
    otp: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{6}$'),
    ]),
  });

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private api: ApiServiceService,
  ) {}

  ngOnInit(): void {
    debugger;
    this.route.queryParams.subscribe((params) => {
      this.countryCode = params['countryCode'];
      this.mobileNumber = params['mobileNumber'];
      this.email = params['email'];
    });

    this.startTimer();
  }

  verifyOtp() {
    if (this.otpForm.invalid) {
      return;
    }

    const payload = {
      email: this.email,
      mobileNumber: this.mobileNumber,
      countryCode: this.countryCode,
      otpCode: this.otpForm.value.otp,
    };

    this.api.verifyOtp(payload).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('userId', res.userId);
        this.toastr.success('Registration successful');

        localStorage.setItem(
          'loggedIn_User',
          JSON.stringify({
            email: res.email,
            mobileNumber: this.mobileNumber,
            countryCode: this.countryCode,
          }),
        );
        this.router.navigateByUrl('/Set-profile');
      },
      error: () => {
        this.toastr.error('Invalid or expired OTP');
      },
    });
  }

  resendOtp() {
    this.timeLeft = 300;
    this.startTimer();

    const payload = {
      email: this.email,
      countryCode: this.countryCode,
      mobileNumber: this.mobileNumber,
    };
    this.api.sendOtp(payload).subscribe(() => {
      this.toastr.success('OTP resent successfully');
    });
  }

  startTimer() {
    this.clearTimer();

    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.clearTimer();
      }
    }, 1000);
  }

  formattedTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;

    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  onlyNumber(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }
  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
