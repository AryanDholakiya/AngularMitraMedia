import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveChat } from '../../../interfaces/active-chat';
import { ChatStateService } from '../../../../Services/ChatPage Services/chat-state.service';
import { ChatMessage } from '../../../interfaces/chat-message';
import { ElementRef, ViewChild } from '@angular/core';
import { SignalRService } from '../../../../Services/signal-r.service';
import { ChatApiService } from '../../../../Services/ChatPage Services/chat-api.service';
import { CurrentUserService } from '../../../../Services/ChatPage Services/current-user.service';

@Component({
  selector: 'app-right-chat-panel',
  standalone: false,
  templateUrl: './right-chat-panel.component.html',
  styleUrl: './right-chat-panel.component.scss',
})
export class RightChatPanelComponent {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  selectedFile!: File;
  FilePreview: string | null = null;

  activatedChat$: Observable<ActiveChat | null>;
  activeReceiverId: number = 0; //same as activatedChat$ but "activerecieverId" only contains the Id
  IsFileInputOpen: boolean = false;

  messages: ChatMessage[] = [];
  loggedInUserId = 0;

  constructor(
    private chatState: ChatStateService,
    private signalR: SignalRService,
    private chatApi: ChatApiService,
    private currentUser: CurrentUserService
  ) {
    this.activatedChat$ = this.chatState.activeChat$;

    //const loggedInUserId = 1; // TEMP (later from auth)
    const user = this.currentUser.getCurrentUser(); //loggedIn user
    if (!user) return;

    this.loggedInUserId = user.userId;

    // Load history when chat changes
    this.chatState.activeChat$.subscribe((chat) => {
      debugger;
      if (!chat) {
        this.messages = [];
        this.resetDraftState();
        return;
      }
      this.activeReceiverId = chat.userId;

      this.resetDraftState();

      // debugger;
      this.chatApi
        .getChatHistory(this.loggedInUserId, chat.userId)
        .subscribe((history) => {
          debugger;
          this.messages = history.map((m) => ({
            ...m,
            isMe: m.senderId === this.loggedInUserId,
          }));

          // setTimeout(() => this.scrollToBottom(), 1);
          requestAnimationFrame(() => {
            //instead of use setTimeout, this is more sufficient
            this.scrollToBottom();
          });
        });
    });

    // Realtime incoming messages
    this.signalR.message$.subscribe((msg) => {
      if (!msg) return;
      debugger;
      if (msg.senderId !== this.loggedInUserId) {
        this.messages.push({
          messageId: 0,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          content: msg.content,
          sentAt: new Date().toISOString(),
          isMe: false,
          attachment: msg.attachment,
        });
      }

      setTimeout(() => this.scrollToBottom(), 1);
    });
  }

  messageText = ''; // data comes using [(ngModel)]

  sendMessage() {
    debugger;
    if (!this.messageText.trim()) return;

    // const messagePayload = {
    //   senderId: this.loggedInUserId,
    //   receiverId: this.activeReceiverId,
    //   message: this.messageText,
    //   content: this.messageText,
    //   time: new Date().toISOString(),
    //   attachment: this.selectedFile,
    // };

    const formdata = new FormData();
    formdata.append('senderId', String(this.loggedInUserId));
    formdata.append('receiverId', String(this.activeReceiverId));
    formdata.append('message', this.messageText);
    formdata.append('content', this.messageText);
    formdata.append('time', new Date().toISOString());
    if (this.selectedFile) {
      formdata.append('attachment', this.selectedFile);
    } else {
      formdata.append('attachment', '');
    }

    // this.signalR.sendMessage(messagePayload);
    this.chatApi.SendaMessage(formdata).subscribe({
      next: (res: any) => {
        debugger;
        console.log(res);
        if (this.FilePreview) {
          URL.revokeObjectURL(this.FilePreview);
        }
      },
      error: (e) => {
        // debugger;
        console.log(e);
      },
    });

    this.messages.push({
      messageId: 0, // temp until backend returns real id
      senderId: this.loggedInUserId,
      receiverId: this.activeReceiverId,
      content: this.messageText,
      sentAt: new Date().toISOString(),
      isMe: true,
      attachment: String(this.selectedFile),
    });

    this.messageText = '';
    setTimeout(() => this.scrollToBottom(), 0);
  }

  openFileInput(event: any) {
    debugger;
    // this.fileInput.nativeElement.click(); //open input type:file
    this.selectedFile = event.target.files[0];
    if (!this.selectedFile) {
      return;
    }
    if (this.selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);

      reader.onload = () => {
        this.FilePreview = reader.result as string;
      };
    } else {
      const objeURL = URL.createObjectURL(this.selectedFile);
      console.log(objeURL);
      this.FilePreview = objeURL;
    }
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }
  }

  //to make "messageText" null on change of receiver from middle-panel
  resetDraftState() {
    this.messageText = '';
    this.FilePreview = null;
    this.selectedFile = undefined as any;
  }
}
