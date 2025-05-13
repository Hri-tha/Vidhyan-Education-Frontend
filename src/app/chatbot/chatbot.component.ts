import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  standalone: true, // ✅ since you're using `imports`
  imports: [CommonModule, FormsModule]
})
export class ChatbotComponent implements OnInit, OnDestroy {
  socket!: Socket;
  messages: { from: 'bot' | 'user' | 'admin', text: string }[] = [];
  userMessage: string = '';
  isConnectedToHrithik = false;
  showInitialPrompt = true;

  ngOnInit(): void {
    // this.socket = io('http://localhost:3000', {
    this.socket = io('https://vidhyan-education-backend.onrender.com', {
      path: '/socket.io/',
      transports: ['websocket'],
      withCredentials: true
    });

    this.socket.on('connect', () => {
      console.log('🟢 Connected to server');
      // Show greeting prompt
      this.showInitialPrompt = true;
    });

    this.socket.on('bot:response', (msg: string) => {
      this.messages.push({ from: 'bot', text: msg });
      this.isConnectedToHrithik = true;
    });

    this.socket.on('chat:fromAdmin', (msg: string) => {
      this.messages.push({ from: 'admin', text: msg });
    });
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(): void {
    if (!this.userMessage.trim() || !this.isConnectedToHrithik) return;

    this.socket.emit('user:message', this.userMessage);
    this.messages.push({ from: 'user', text: this.userMessage });
    this.userMessage = '';
  }

  onAccept(): void {
    this.socket.emit('user:requestChat');
    this.messages.push({ from: 'bot', text: 'Connecting you to Hrithik...' });
    this.showInitialPrompt = false;
  }

  onDecline(): void {
    this.messages.push({ from: 'bot', text: 'Thank you, visit again.' });
    this.showInitialPrompt = false;
  }
}
