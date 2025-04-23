import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ ADD THIS

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  standalone: true, // ✅ since you're using `imports`
  imports: [CommonModule, FormsModule] // ✅ ADD FormsModule here
})
export class ChatbotComponent {
  userInput: string = '';
  messages: { sender: 'user' | 'bot', text: string }[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ sender: 'user', text: this.userInput });

    this.chatService.askQuestion(this.userInput).subscribe(response => {
      this.messages.push({ sender: 'bot', text: response.answer });
      this.userInput = '';
    });
  }
}
