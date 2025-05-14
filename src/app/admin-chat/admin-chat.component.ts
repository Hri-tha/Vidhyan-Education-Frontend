import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminChatComponent implements OnInit {
  userMessages: { socketId: string, message: string }[] = [];
  selectedSocketId: string = '';
  reply: string = '';
  isAdmin: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    const email = localStorage.getItem('userEmail');
    this.isAdmin = email === 'hrithikkthakurdbg@gmail.com';

    if (this.isAdmin) {
      this.chatService.adminJoin();

      this.chatService.onUserMessage(data => {
        const index = this.userMessages.findIndex(msg => msg.socketId === data.socketId);
        if (index === -1) {
          this.userMessages.push(data); // new user
        } else {
          // replace to trigger Angular update
          this.userMessages[index] = { ...this.userMessages[index], message: data.message };
        }
      });
    }
  }

  selectUser(socketId: string) {
    this.selectedSocketId = socketId;
  }

  sendReply() {
    if (!this.reply.trim() || !this.selectedSocketId) return;
    this.chatService.sendAdminMessage(this.selectedSocketId, this.reply);
    this.reply = '';
  }

  getSelectedMessage() {
    return this.userMessages.find(m => m.socketId === this.selectedSocketId)?.message || 'No message selected';
  }
}
