import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendMessageComponent } from './Components/send-message/send-message.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { VerifyOtpComponent } from './Components/verify-Otp/verify-Otp.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Register',
    pathMatch: 'full',
  },
  {
    path: 'Register',
    component: RegistrationComponent,
  },
  {
    path: 'SendMessage',
    component: SendMessageComponent,
  },
  {
    path: 'Verify-Otp',
    component: VerifyOtpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
