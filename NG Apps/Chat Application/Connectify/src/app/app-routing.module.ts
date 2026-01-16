import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendMessageComponent } from './Components/send-message/send-message.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { VerifyOtpComponent } from './Components/verify-Otp/verify-Otp.component';
import { LoginComponent } from './Components/login/login.component';
import { authGuardsGuard, LoginGuardsGuard } from './Guards/auth-guards.guard';
import { SetProfileComponent } from './Components/set-profile/set-profile.component';
import { ChatLayoutComponent } from './Components/chat/chat-layout/chat-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Register',
    pathMatch: 'full',
  },
  {
    path: 'Register',
    component: RegistrationComponent,
    canActivate: [LoginGuardsGuard],
  },
  {
    path: 'Login',
    component: LoginComponent,
    canActivate: [LoginGuardsGuard],
  },
  {
    path: 'Set-profile',
    component: SetProfileComponent,
  },
  {
    path: 'SendMessage',
    component: SendMessageComponent,
    canActivate: [authGuardsGuard],
  },
  {
    path: 'Verify-Otp',
    component: VerifyOtpComponent,
  },
  {
    path: 'chat',
    component: ChatLayoutComponent,
    canActivate: [authGuardsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
