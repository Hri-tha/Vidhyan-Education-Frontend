import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatbotComponent implements OnInit, OnDestroy {
  messages: { from: 'bot' | 'user' | 'admin', text: string }[] = [];
  userMessage = '';
  isConnectedToHrithik = false;
  showInitialPrompt = true;
  chatEnded = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages.push({ from: 'bot', text: 'Hi, Do you want to connect with Hrithik?' });

    this.chatService.onBotResponse((msg) => {
      this.messages.push({ from: 'bot', text: msg });
      this.isConnectedToHrithik = true;
    });

    this.chatService.onAdminReply((msg) => {
      this.messages.push({ from: 'admin', text: msg });
    });
  }

  ngOnDestroy(): void {
    this.chatService.disconnectSocket();
  }

  sendMessage(): void {
    if (!this.userMessage.trim() || !this.isConnectedToHrithik) return;
    this.messages.push({ from: 'user', text: this.userMessage });
    this.chatService.sendUserMessage(this.userMessage);
    this.userMessage = '';
  }

  onAccept(): void {
    this.chatService.requestChat();
    this.messages.push({ from: 'bot', text: 'Connecting you to Hrithik...' });
    this.showInitialPrompt = false;
  }

  onDecline(): void {
    this.messages.push({ from: 'bot', text: 'Thank you, visit again.' });
    this.showInitialPrompt = false;
  }

  endChat(): void {
    this.chatService.disconnectSocket();
    this.isConnectedToHrithik = false;
    this.chatEnded = true;
    this.messages.push({ from: 'bot', text: 'You have ended the chat.' });
  }

  downloadChat(): void {
    const doc = new jsPDF();
    const rows = this.messages.map((msg, index) => [
      index + 1,
      msg.from === 'user' ? 'You' : msg.from === 'admin' ? 'Hrithik' : 'Bot',
      msg.text
    ]);

    autoTable(doc, {
      head: [['#', 'Sender', 'Message']],
      body: rows
    });

    doc.save('chat-history.pdf');
  }
}
