import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../../../../../Services/ChatPage Services/current-user.service';
import { ChatApiService } from '../../../../../Services/ChatPage Services/chat-api.service';
import { ChatItem } from '../../../../interfaces/chat-item';
import { ActiveChat } from '../../../../interfaces/active-chat';
import { ChatStateService } from '../../../../../Services/ChatPage Services/chat-state.service';

@Component({
  selector: 'app-add-contact',
  standalone: false,
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss',
})
export class AddContactComponent implements OnInit {
  activeChatId: number | null = null;
  chats: ChatItem[] = []; //this will be used in html
  allChats: ChatItem[] = []; // this is for the filter
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
        this.chats = res;
        this.allChats = res;
        console.log('chats:', this.chats);
      },
      error: (e) => {
        debugger;
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

  searchPerson(event: any) {
    let word = event.target.value.toLowerCase();
    // let word = (event.target as HTMLInputElement).value.toLowerCase();
    console.log('Full word:', word);

    this.chats = this.allChats;
    this.chats = this.chats.filter(
      (chat) =>
        chat.username.toString().toLowerCase().includes(word) ||
        chat.userId.toString().includes(word),
    );
  }
}
