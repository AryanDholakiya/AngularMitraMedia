import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendMessageComponent } from './Components/send-message/send-message.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'SendMessage',
    pathMatch: 'full',
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
