import { Component, inject, OnInit } from '@angular/core';
import { ChatItem } from '../../../../interfaces/chat-item';
import { ChatStateService } from '../../../../../Services/ChatPage Services/chat-state.service';
import { ActiveChat } from '../../../../interfaces/active-chat';
import { CurrentUserService } from '../../../../../Services/ChatPage Services/current-user.service';
import { ChatApiService } from '../../../../../Services/ChatPage Services/chat-api.service';

@Component({
  selector: 'app-chat-list',
  standalone: false,
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent implements OnInit {
  activeChatId: number | null = null;
  chats: ChatItem[] = [];
  CurrentLoggedInUserId = 0;

  constructor(
    private chatState: ChatStateService,
    private currentUser: CurrentUserService,
    private getChatList: ChatApiService,
  ) {
    this.chatState.activeChat$.subscribe((chat: ActiveChat | null) => {
      if (chat?.userId) {
        this.activeChatId = chat?.userId;
        console.log('activeChatId: ', this.activeChatId);
      }
    });
  }
  ngOnInit() {
    // console.log(this.activeChatId);
    const user = this.currentUser.getCurrentUser();
    if (!user) {
      return;
    }
    // debugger;
    this.CurrentLoggedInUserId = +user?.userId;
    // console.log('loggedIn user: ', this.CurrentLoggedInUserId);

    this.getChatList.GetChatList(this.CurrentLoggedInUserId).subscribe({
      next: (res: any) => {
        // debugger;
        console.log('response from chatlist', res);

        // this.chats = res;
        this.chats = res.filter(
          (x: any) => x.lastMessage !== null || x.attachmentName !== null,
        );
        console.log('Chats array:', this.chats);
      },
      error: (e) => {
        // debugger;
        console.log(e);
      },
    });
  }

  selectChat(chatUser: ChatItem) {
    // debugger;
    this.chatState.setActiveChat({
      userId: chatUser.userId,
      username: chatUser.username,
      profileImage: chatUser.profileImage,
    });
  }
}
