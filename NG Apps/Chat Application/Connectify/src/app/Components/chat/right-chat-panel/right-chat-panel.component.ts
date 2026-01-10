import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveChat } from '../../../interfaces/active-chat';
import { ChatStateService } from '../../../../Services/ChatPage Services/chat-state.service';
import { ChatMessage } from '../../../interfaces/chat-message';
import { ElementRef, ViewChild } from '@angular/core';
import { SignalRService } from '../../../../Services/signal-r.service';

@Component({
  selector: 'app-right-chat-panel',
  standalone: false,
  templateUrl: './right-chat-panel.component.html',
  styleUrl: './right-chat-panel.component.scss',
})
export class RightChatPanelComponent {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  activatedChat$: Observable<ActiveChat | null>;

  constructor(
    private chatState: ChatStateService,
    private signalR: SignalRService
  ) {
    this.activatedChat$ = this.chatState.activeChat$;
    this.signalR.message$.subscribe((msg) => {
      if (!msg) return;

      this.messages.push({
        id: Date.now(),
        text: msg.message,
        isMe: false,
        time: msg.time,
      });

      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

  messages: ChatMessage[] = [
    {
      id: 1,
      text: 'Hi! How are you?',
      isMe: false,
      time: '10:20 AM',
    },
    {
      id: 2,
      text: 'I am good. What about you?',
      isMe: true,
      time: '10:21 AM',
    },
    {
      id: 3,
      text: 'All good 😊',
      isMe: false,
      time: '10:22 AM',
    },
  ];

  messageText = '';

  sendMessage() {
    if (!this.messageText.trim()) return;

    const messagePayload = {
      senderId: 1, // temporary
      receiverId: 2, // temporary
      message: this.messageText,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    this.signalR.sendMessage(messagePayload);

    this.messages.push({
      id: Date.now(),
      text: this.messageText,
      isMe: true,
      time: messagePayload.time,
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
