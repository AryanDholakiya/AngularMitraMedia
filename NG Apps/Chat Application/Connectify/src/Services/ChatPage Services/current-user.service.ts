import { Injectable } from '@angular/core';
import { CurrentUser } from '../../app/interfaces/current-user';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  getCurrentUser(): CurrentUser | null {
    const userId = localStorage.getItem('userId');
    const userData = localStorage.getItem('loggedIn_User');

    if (!userId || !userData) return null;

    const parsed = JSON.parse(userData);

    return {
      userId: Number(userId),
      mobileNumber: parsed.mobileNumber,
      countryCode: parsed.countryCode,
      email: parsed.email,
    };
  }
}
