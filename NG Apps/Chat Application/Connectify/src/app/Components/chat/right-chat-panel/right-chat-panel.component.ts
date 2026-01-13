import { Component } from '@angular/core';
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

  activatedChat$: Observable<ActiveChat | null>;
  activeReceiverId: number = 0; //same as activatedChat$ but "activerecieverId" only contains the Id

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
        return;
      }
      this.activeReceiverId = chat.userId;

      // debugger;
      this.chatApi
        .getChatHistory(this.loggedInUserId, chat.userId)
        .subscribe((history) => {
          debugger;
          this.messages = history.map((m) => ({
            ...m,
            isMe: m.senderId === this.loggedInUserId,
          }));

          setTimeout(() => this.scrollToBottom(), 0);
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
        });
      }

      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

  messageText = ''; // data comes using [(ngModel)]

  sendMessage() {
    debugger;
    if (!this.messageText.trim()) return;

    const messagePayload = {
      senderId: this.loggedInUserId, // temporary
      receiverId: this.activeReceiverId,
      message: this.messageText,
      content: this.messageText,
      time: new Date().toISOString(),
    };

    // this.signalR.sendMessage(messagePayload);
    this.chatApi.SendaMessage(messagePayload).subscribe({
      next: (res: any) => {
        // debugger;
        console.log(res);
      },
      error: (e) => {
        debugger;
        console.log(e);
      },
    });

    this.messages.push({
      messageId: 0, // temp until backend returns real id
      senderId: messagePayload.senderId,
      receiverId: messagePayload.receiverId,
      content: this.messageText,
      sentAt: new Date().toISOString(),
      isMe: true,
    });

    this.messageText = '';
    setTimeout(() => this.scrollToBottom(), 0);
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    }
  }
}
