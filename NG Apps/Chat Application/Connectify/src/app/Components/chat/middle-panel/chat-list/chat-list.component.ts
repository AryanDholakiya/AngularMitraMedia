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
    private getChatList: ChatApiService
  ) {
    this.chatState.activeChat$.subscribe((chat: ActiveChat | null) => {
      if (chat?.userId) this.activeChatId = chat?.userId;
    });
  }
  ngOnInit() {
    console.log(this.activeChatId);
    const user = this.currentUser.getCurrentUser();
    if (!user) {
      return;
    }
    this.CurrentLoggedInUserId = user?.userId;
    // console.log('loggedIn user: ', this.CurrentLoggedInUserId);

    this.getChatList.GetChatList(this.CurrentLoggedInUserId).subscribe({
      next: (res: any) => {
        debugger;
        this.chats = res;
      },
      error: (e) => {
        debugger;
        console.log(e);
      },
    });
  }
  // this.chats = [
  //   {
  //     userid: 1,
  //     username: 'Rahul',
  //     profileImage: 'assets/default_profile_pic.jpg',
  //     lastMessage: 'Hey, how are you?',
  //     lastMessageTime: '10:30 AM',
  //   },
  //   {
  //     userid: 2,
  //     username: 'Priya',
  //     profileImage: 'assets/default_profile_pic.jpg',
  //     lastMessage: 'Let’s meet tomorrow',
  //     lastMessageTime: 'Yesterday',
  //   },
  //   {
  //     userid: 3,
  //     username: 'Amit',
  //     profileImage: 'assets/default_profile_pic.jpg',
  //     lastMessage: 'Okay 👍',
  //     lastMessageTime: 'Mon',
  //   },
  // ];

  selectChat(chatUser: ChatItem) {
    debugger;
    this.chatState.setActiveChat({
      userId: chatUser.userId,
      username: chatUser.username,
      profileImage: chatUser.profileImage,
    });
  }
}
