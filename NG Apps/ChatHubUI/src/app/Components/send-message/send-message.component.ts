import { Component, inject, OnInit } from '@angular/core';
import { SignalrService } from '../../Services/signalr.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../Services/api.service';
import { Messages } from '../../interfaces/messages';

@Component({
  selector: 'app-send-message',
  standalone: false,
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css',
})
export class SendMessageComponent implements OnInit {
  messageList: Messages[] = [];
  private signalRService = inject(SignalrService);
  private SendMsgApi = inject(ApiService);

  senderForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.RecieveMessages();

    this.signalRService.recieveMessage$.subscribe((data: Messages) => {
      if (data.message) this.messageList.push(data);
    });
  }

  sendmsg() {
    if (this.senderForm.valid) {
      const data: Messages = {
        userName: this.senderForm.value.user ?? '',
        message: this.senderForm.value.message ?? '',
      };
      this.SendMsgApi.send(data).subscribe({
        next: (res) => {
          this.senderForm.get('message')?.setValue('');
        },
      });
    }
  }
}
