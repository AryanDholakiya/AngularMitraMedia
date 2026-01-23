import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SendMessageComponent } from './Components/send-message/send-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { RegistrationComponent } from './Components/registration/registration.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerifyOtpComponent } from './Components/verify-Otp/verify-Otp.component';
import { LoginComponent } from './Components/login/login.component';
import { SetProfileComponent } from './Components/set-profile/set-profile.component';
import { ChatLayoutComponent } from './Components/chat/chat-layout/chat-layout.component';
import { LeftSidebarComponent } from './Components/chat/left-sidebar/left-sidebar.component';
import { MiddlePanelComponent } from './Components/chat/middle-panel/middle-panel.component';
import { ChatListComponent } from './Components/chat/middle-panel/chat-list/chat-list.component';
import { RightChatPanelComponent } from './Components/chat/right-chat-panel/right-chat-panel.component';
import { AddContactComponent } from './Components/chat/middle-panel/add-contact/add-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    SendMessageComponent,
    RegistrationComponent,
    VerifyOtpComponent,
    LoginComponent,
    SetProfileComponent,
    ChatLayoutComponent,
    LeftSidebarComponent,
    MiddlePanelComponent,
    ChatListComponent,
    RightChatPanelComponent,
    AddContactComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    FormsModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
