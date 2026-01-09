import { Component, inject } from '@angular/core';
import { ChatItem } from '../../../../interfaces/chat-item';
import { ChatStateService } from '../../../../../Services/ChatPage Services/chat-state.service';
import { ActiveChat } from '../../../../interfaces/active-chat';

@Component({
  selector: 'app-chat-list',
  standalone: false,
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent {
  activeChatId: number | null = null;

  constructor(private chatState: ChatStateService) {
    this.chatState.activeChat$.subscribe((chat: ActiveChat | null) => {
      this.activeChatId = chat?.id ?? null;
    });
  }

  chats: ChatItem[] = [
    {
      id: 1,
      username: 'Rahul',
      profileImage: 'assets/default_profile_pic.jpg',
      lastMessage: 'Hey, how are you?',
      lastMessageTime: '10:30 AM',
    },
    {
      id: 2,
      username: 'Priya',
      profileImage: 'assets/default_profile_pic.jpg',
      lastMessage: 'Let’s meet tomorrow',
      lastMessageTime: 'Yesterday',
    },
    {
      id: 3,
      username: 'Amit',
      profileImage: 'assets/default_profile_pic.jpg',
      lastMessage: 'Okay 👍',
      lastMessageTime: 'Mon',
    },
  ];

  selectChat(chat: any) {
    this.chatState.setActiveChat({
      id: chat.id,
      username: chat.username,
      profileImage: chat.profileImage,
    });
  }
}
