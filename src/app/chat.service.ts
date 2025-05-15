// import { Injectable } from '@angular/core';
// import { io, Socket } from 'socket.io-client';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChatService {
//   private socket: Socket;

//   constructor(private http: HttpClient) {
//     this.socket = io('https://vidhyan-education-backend.onrender.com', {
//     // this.socket = io('http://localhost:3000', {
//       path: '/socket.io/',
//       transports: ['websocket'],
//       withCredentials: true
//     });
//   }

//   // ✅ WebSocket: User flow
//   requestChat() {
//     this.socket.emit('user:requestChat');
//   }

//   sendUserMessage(message: string) {
//     this.socket.emit('user:message', message);
//   }

//   onBotResponse(callback: (msg: string) => void) {
//     this.socket.on('bot:response', callback);
//   }

//   onAdminReply(callback: (msg: string) => void) {
//     this.socket.on('chat:fromAdmin', callback);
//   }

//   // ✅ WebSocket: Admin flow
//   adminJoin() {
//     this.socket.emit('admin:join');
//   }

//   sendAdminMessage(toSocketId: string, message: string) {
//     this.socket.emit('admin:message', { toSocketId, message });
//   }

//   onUserMessage(callback: (data: { socketId: string, message: string }) => void) {
//     this.socket.on('chat:fromUser', callback);
//   }

//   disconnectSocket() {
//     this.socket.disconnect();
//   }

//   // ✅ HTTP (OpenAI, FAQ etc.)
//   askQuestion(question: string) {
//     return this.http.post<{ answer: string }>('https://vidhyan-education-backend.onrender.com/api/chat', { question });
//   }

//   getAllFAQs() {
//     return this.http.get<any[]>('https://vidhyan-education-backend.onrender.com/api/faqs');
//   }

//   addFAQ(newFAQ: any) {
//     return this.http.post('https://vidhyan-education-backend.onrender.com/api/faqs', newFAQ);
//   }
// }
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io('https://vidhyan-education-backend.onrender.com', {
      // this.socket = io('http://localhost:3000', {
      path: '/socket.io/',
      transports: ['websocket'],
      withCredentials: true
    });
  }

  // ✅ WebSocket: User flow
  requestChat() {
    const userName = localStorage.getItem('userName') || 'User';
    this.socket.emit('user:requestChat', { userName });
  }

  sendUserMessage(message: string) {
    const userName = localStorage.getItem('userName') || 'User';
    this.socket.emit('user:message', { message, userName });
  }

  onBotResponse(callback: (msg: string) => void) {
    this.socket.on('bot:response', callback);
  }

  onAdminReply(callback: (msg: string) => void) {
    this.socket.on('chat:fromAdmin', callback);
  }

  // ✅ WebSocket: Admin flow
  adminJoin() {
    this.socket.emit('admin:join');
  }

  sendAdminMessage(toSocketId: string, message: string) {
    this.socket.emit('admin:message', { toSocketId, message });
  }

  onUserMessage(callback: (data: { socketId: string, message: string, userName?: string }) => void) {
    this.socket.on('chat:fromUser', callback);
  }

  disconnectSocket() {
    this.socket.disconnect();
  }

  // ✅ HTTP (OpenAI, FAQ etc.)
  askQuestion(question: string) {
    return this.http.post<{ answer: string }>('https://vidhyan-education-backend.onrender.com/api/chat', { question });
  }

  getAllFAQs() {
    return this.http.get<any[]>('https://vidhyan-education-backend.onrender.com/api/faqs');
  }

  addFAQ(newFAQ: any) {
    return this.http.post('https://vidhyan-education-backend.onrender.com/api/faqs', newFAQ);
  }
}