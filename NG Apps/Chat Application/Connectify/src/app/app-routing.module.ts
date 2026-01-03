import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendMessageComponent } from './Components/send-message/send-message.component';
import { RegistrationComponent } from './Components/registration/registration.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
