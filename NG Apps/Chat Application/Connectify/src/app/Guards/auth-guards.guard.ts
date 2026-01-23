import { HostListener, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardsGuard: CanActivateFn = (route, state) => {
  // debugger;
  const router = inject(Router);

  const AlreadyLoggedIn = localStorage.getItem('loggedIn_User');
  const Profile_Edited = localStorage.getItem('userId');
  if (AlreadyLoggedIn && Profile_Edited) {
    return true;
  }
  router.navigate(['/Login']);
  return false;
};

export const LoginGuardsGuard: CanActivateFn = (route, state) => {
  // debugger;
  const router = inject(Router);

  const AlreadyLoggedIn = localStorage.getItem('loggedIn_User');
  const Profile_Edited = localStorage.getItem('userId');
  if (!AlreadyLoggedIn && !Profile_Edited) {
    return true;
  }
  router.navigate(['/chat']);
  return false;
};

export const verifyOtpGuard: CanActivateFn = (route, state) => {
  // debugger;
  const router = inject(Router);

  const AlreadyLoggedIn = localStorage.getItem('loggedIn_User');
  const Profile_Edited = localStorage.getItem('userId');
  if (AlreadyLoggedIn && !Profile_Edited) {
    return true;
  }
  router.navigate(['/chat']);
  return false;
};
