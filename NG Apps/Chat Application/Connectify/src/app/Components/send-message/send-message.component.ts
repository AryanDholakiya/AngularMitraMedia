import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignalRService } from '../../../Services/signal-r.service';
import { ApiServiceService } from '../../../Services/api-service.service';
import { Sender } from '../../interfaces/sender';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-message',
  standalone: false,
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss',
})
export class SendMessageComponent implements OnInit {
  public messageList: Sender[] = [];

  Logged_User: any;
  username = '';
  email = '';
  profileImage = 'assets/default_profile_pic.jpg';

  private signrService = inject(SignalRService);
  private apiService = inject(ApiServiceService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    const Signed_User = JSON.parse(
      localStorage.getItem('loggedIn_User') || '{}'
    );

    const UserId = Number(localStorage.getItem('userId'));

    this.apiService.getProfile(UserId).subscribe({
      next: (res: any) => {
        console.log(res);
        if (!res.isProfileCompleted) {
          this.router.navigate(['/Set-profile']);
          return;
        }
        this.username = res.username;
        this.email = res.email;
        localStorage.setItem('loggedIn_User', JSON.stringify(res));
        if (res.profileImage) {
          this.profileImage = 'data:image/png;base64,' + res.profileImage;
        }
      },
      error: (e) => {
        this.toastr.error('User Profile Not Setted.');
        this.router.navigate(['/Set-profile']);
      },
    });

    if (Signed_User) {
      console.log('signed_user: ', Signed_User);
      this.senderForm.get('senderName')?.setValue(Signed_User.mobileNumber);
      this.Logged_User = Signed_User.mobileNumber; //NOTE
      console.log('Logged_user: ', this.Logged_User);
    }

    this.signrService.startConnection();
    this.signrService.RecieveMessage();

    this.signrService.RecivedMessage$.subscribe((data: Sender) => {
      if (data.message) {
        const currentUser = this.senderForm.get('senderName')?.value;
        const previousMessage = this.messageList[this.messageList.length - 1];

        const newMessage: Sender = {
          ...data,
          IsMe: data.sender === currentUser,
          isGrouped: previousMessage?.sender === data.sender,
        };
        // console.log('isgrouped: ', newMessage.isGrouped);
        this.messageList.push(newMessage);
      }
    });
  }

  senderForm = new FormGroup({
    senderName: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  send() {
    if (this.senderForm.valid) {
      const data: Sender = {
        // sender: this.senderForm.get('senderName')?.value ?? '',
        sender: this.Logged_User ?? '',
        message: this.senderForm.get('message')?.value ?? '',
      };
      console.log(data);
      this.apiService.sendmessage(data).subscribe({
        next: (res) => {
          this.senderForm.get('message')?.setValue('');
        },
      });
    }
  }

  LogOut() {
    localStorage.clear();
    this.router.navigateByUrl('Login');
  }
}
