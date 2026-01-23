import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveChat } from '../../../interfaces/active-chat';
import { ChatStateService } from '../../../../Services/ChatPage Services/chat-state.service';
import { ChatMessage } from '../../../interfaces/chat-message';
import { ElementRef, ViewChild } from '@angular/core';
import { SignalRService } from '../../../../Services/signal-r.service';
import { ChatApiService } from '../../../../Services/ChatPage Services/chat-api.service';
import { CurrentUserService } from '../../../../Services/ChatPage Services/current-user.service';
import { MessageSeen } from '../../../interfaces/message-seen';

@Component({
  selector: 'app-right-chat-panel',
  standalone: false,
  templateUrl: './right-chat-panel.component.html',
  styleUrl: './right-chat-panel.component.scss',
})
export class RightChatPanelComponent {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  showScrollButton = false;
  NewMessageNotification = false;
  NewMessageCounter = 0;
  IsSeen = false;

  // selectedFile!: any;
  selectedFile?: File | null;
  selectedFileType?: string;
  modalPhoto?: string = '';

  FilePreview: string | null = null;

  activatedChat$: Observable<ActiveChat | null>;
  activeReceiverId: number = 0; //same as activatedChat$ but "activerecieverId" only contains the Id
  IsFileInputOpen: boolean = false;

  messages: ChatMessage[] = [];
  loggedInUserId = 0;

  modalAttachmentName?: string;

  constructor(
    private chatState: ChatStateService,
    private signalR: SignalRService,
    private chatApi: ChatApiService,
    private currentUser: CurrentUserService,
  ) {
    this.activatedChat$ = this.chatState.activeChat$;

    //const loggedInUserId = 1; // TEMP (later from auth)
    const user = this.currentUser.getCurrentUser(); //loggedIn user
    if (!user) return;

    this.loggedInUserId = user.userId;

    // Load history when chat changes
    this.chatState.activeChat$.subscribe((chat) => {
      // debugger;
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
          // debugger;
          this.messages = history.map((m) => ({
            ...m,
            isMe: m.senderId === this.loggedInUserId,
            // attachment: m.attachment
            //   ? `data:${m.attachmentType};base64,${m.attachment}`
            //   : undefined,
          }));

          setTimeout(() => {
            // debugger;
            this.scrollToBottom(true);
          }, 5);
        });
    });

    // Realtime incoming messages
    this.signalR.message$.subscribe((msg) => {
      if (!msg) return;
      debugger;

      if (msg.senderId === this.activeReceiverId) {
        this.messages.push({
          messageId: msg.messageId,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          content: msg.content,
          sentAt: new Date().toISOString(),
          isMe: false,
          isSeen: true,
          attachment: msg.attachment,
          attachmentType: msg.attachmentType,
          attachmentName: msg.attachmentName,
        });
        this.IsSeenMessage();
      }

      // debugger;
      if (this.showScrollButton) {
        this.NewMessageNotification = true;
        this.NewMessageCounter++;
      } else {
        setTimeout(() => {
          this.scrollToBottom();
        }, 50);
      }
      // setTimeout(() => this.scrollToBottom(), 5);
    });

    // Message Seen or not
    this.signalR.Seenmessage$.subscribe((data) => {
      debugger;
      if (data?.senderId === this.activeReceiverId) {
        for (let msg of this.messages) {
          msg.isSeen = true;
        }
      }
    });
  }

  messageText = ''; // data comes using [(ngModel)]

  sendMessage() {
    // debugger;
    if (!this.selectedFile && !this.messageText.trim()) return;

    const formdata = new FormData();
    formdata.append('senderId', String(this.loggedInUserId));
    formdata.append('receiverId', String(this.activeReceiverId));
    formdata.append('message', this.messageText);
    formdata.append('content', this.messageText ?? null);
    formdata.append('time', new Date().toISOString());
    if (this.selectedFile) {
      formdata.append('attachment', this.selectedFile);
    } else {
      formdata.append('attachment', '');
    }

    // this.signalR.sendMessage(messagePayload);
    this.chatApi.SendaMessage(formdata).subscribe({
      next: (res: any) => {
        // debugger;
        console.log(res);

        this.FilePreview = null; // hide preview
        this.selectedFile = undefined;
        //this.selectedFile = null; //response will be success then file preview should be invisible
        if (this.FilePreview) {
          URL.revokeObjectURL(this.FilePreview);
        }

        this.messages.push({
          messageId: res.messageId,
          senderId: this.loggedInUserId,
          receiverId: this.activeReceiverId,
          content: this.messageText,
          sentAt: new Date().toISOString(),
          isMe: true,
          isSeen: false,
          attachment: res.attachment,
          //added
          attachmentType: res.attachmentType,
          attachmentName: res.attachmentName,
        });
        this.messageText = '';
        setTimeout(() => this.scrollToBottom(), 5);
      },
      error: (e) => {
        // debugger;
        console.log(e);
      },
    });
    // setTimeout(() => this.scrollToBottom(), 1);
  }

  openFileInput(event: any) {
    // debugger;
    // this.fileInput.nativeElement.click(); //open input type:file using ViewChild
    this.selectedFile = event.target.files[0];
    this.selectedFileType = this.selectedFile?.type;
    console.log(this.selectedFileType);

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

  onScroll() {
    const ele = this.messagesContainer.nativeElement;

    const threshold = 50;
    const isAtBottom =
      ele.scrollHeight - ele.scrollTop <= ele.clientHeight + threshold;

    this.showScrollButton = !isAtBottom;

    if (this.NewMessageNotification && this.showScrollButton == false) {
      this.NewMessageNotification = false;
      this.NewMessageCounter = 0;
    }
  }
  scrollToBottom(isSeen = false) {
    // debugger;
    if (this.messagesContainer) {
      this.messagesContainer.nativeElement.scrollTo({
        top: this.messagesContainer.nativeElement.scrollHeight,
        behavior: 'smooth', // Optional: adds a nice smooth glide
      });

      if (this.NewMessageNotification) {
        this.NewMessageNotification = false;
        this.NewMessageCounter = 0;
      }
    }

    if (isSeen) this.IsSeenMessage();
  }

  //messages seen
  IsSeenMessage() {
    debugger;
    const data: MessageSeen = {
      senderId: this.loggedInUserId,
      receiverId: this.activeReceiverId,
    };
    this.chatApi.MessageSeen(data).subscribe({
      next: (res: any) => {
        debugger;
        // for (let msg of this.messages) {
        //   msg.isSeen = true;
        // }
      },
      error: (e) => {
        // debugger;
        console.log(e);
      },
    });
  }

  //to make "messageText" null on change of receiver from middle-panel
  resetDraftState() {
    this.messageText = '';
    this.FilePreview = null;
    this.selectedFile = undefined as any;
  }

  //Attachment
  OpenselectedPhoto(photo: string, Name?: string, type?: string) {
    // debugger;
    this.modalPhoto = photo;
    this.modalAttachmentName = Name;
    this.selectedFileType = type;
  }

  //download the attachment:
  downloadAttachment() {
    // Remove focus from modal
    (document.activeElement as HTMLElement)?.blur();
    // debugger;
    if (!this.modalPhoto) return;

    const mimeType = this.selectedFileType || 'application/octet-stream';
    const originalName = this.modalAttachmentName;

    const byteCharacters = atob(this.modalPhoto); //When you receive an image or file from an API, it often comes as a Base64 string (this.modalPhoto). To download that file or convert it into a real file (Blob), you first need to decode it using atob().
    const byteNumbers = new Array(byteCharacters.length); //"new Array"->This creates a new, empty list (array) in your computer's memory.
    //"byteCharacters.length" -> It measures exactly how many characters were in the decoded string (from atob). If the file has 5,000 characters, the array will have 5,000 empty slots.

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    // To create a downloadable file (a Blob), JavaScript requires an array of integers (bytes). atob() only gives you a string. This loop bridges the gap between a string of text and raw binary data.

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType }); //Blob stands for Binary Large Object
    //Uint8Array stands for "Unsigned Integer 8-bit Array". It is a special type of array that strictly holds numbers between 0 and 255. This is the exact format used for "Bytes"—the building blocks of any digital file

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = originalName || this.getDownloadFileName(mimeType);
    a.click();
    URL.revokeObjectURL(url);
  }

  getDownloadFileName(mimeType: string): string {
    // debugger;
    const extensionMap: { [key: string]: string } = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'application/pdf': 'pdf',
      'application/x-zip-compressed': 'zip',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        'xlsx',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        'docx',
    };

    const ext = extensionMap[mimeType] || 'bin';
    return `Connectify-file.${ext}`;
  }
  //preview of selected attachment
  getFilePreview(mimeType: string | undefined): string {
    if (!mimeType) return 'assets/DefaultFilePreviewImg.png';

    if (mimeType.startsWith('image/')) {
      return this.FilePreview ?? 'assets/DefaultFilePreviewImg.png';
    }
    // Map other specific types to their icons
    const iconMap: { [key: string]: string } = {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        'assets/Xlsheets cover image.jpg',
      'application/pdf': 'assets/pdf file cover image.jpg',
      'application/x-zip-compressed': 'assets/zip icon.png',
      'application/msword': 'assets/doc file cover image.jpg',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        'assets/doc file cover image.jpg',
    };
    return iconMap[mimeType] || 'assets/DefaultFilePreviewImg.png';
  }
}
