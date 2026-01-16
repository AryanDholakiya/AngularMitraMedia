import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Sender } from '../app/interfaces/sender';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private client = inject(HttpClient);

  sendmessage(formdata: Sender) {
    return this.client.post(
      'https://localhost:7132/api/ConectifyMain/Send',
      formdata
    );
  }

  sendOtp(data: any) {
    return this.client.post(
      'https://localhost:7132/api/ConectifyMain/send-otp',
      data
    );
  }

  verifyOtp(data: any) {
    return this.client.post(
      'https://localhost:7132/api/ConectifyMain/verify-otp',
      data
    );
  }

  //send login otp:
  sendLoginOtp(data: any) {
    // debugger;
    return this.client.post(
      'https://localhost:7132/api/ConectifyMain/Login-otp',
      data
    );
  }
  verifyLoginOtp(data: any) {
    return this.client.post(
      'https://localhost:7132/api/ConectifyMain/verify-Login-otp',
      data
    );
  }

  //profile :
  updateProfile(data: FormData) {
    debugger;
    return this.client.post(
      'https://localhost:7132/api/ConectifyMain/update-profile',
      data
    );
  }

  getProfile(userId: number) {
    return this.client.get(
      `https://localhost:7132/api/ConectifyMain/get-profile/${userId}`
    );
  }
}
