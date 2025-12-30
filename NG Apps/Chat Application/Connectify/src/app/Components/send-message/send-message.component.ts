import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignalRService } from '../../../Services/signal-r.service';
import { ApiServiceService } from '../../../Services/api-service.service';
import { Sender } from '../../interfaces/sender';

@Component({
  selector: 'app-send-message',
  standalone: false,
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss',
})
export class SendMessageComponent implements OnInit {
  public messageList: Sender[] = [];

  private signrService = inject(SignalRService);
  private apiService = inject(ApiServiceService);

  ngOnInit(): void {
    this.signrService.startConnection();
    this.signrService.RecieveMessage();

    this.signrService.RecivedMessage$.subscribe((data: Sender) => {
      debugger;
      if (data.message) {
        const currentUser = this.senderForm.get('senderName')?.value;
        const previousMessage = this.messageList[this.messageList.length - 1];

        const newMessage: Sender = {
          ...data,
          IsMe: data.sender === currentUser,
          isGrouped: previousMessage?.sender === data.sender,
        };
        console.log('isgrouped: ', newMessage.isGrouped);
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
        sender: this.senderForm.get('senderName')?.value ?? '',
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
}
