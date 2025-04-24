import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {}

  // askQuestion(question: string) {
  //   return this.http.post<{ answer: string }>('https://vidhyan-education-backend.onrender.com/api/chat', { question });
  // }

  // askQuestion(question: string) {
  //   return this.http.post<{ answer: string }>('http://localhost:3000/api/chat', { question });
  // }

  // chat.service.ts
askQuestion(question: string) {
  return this.http.post<{ answer: string }>('https://vidhyan-education-backend.onrender.com/api/chat', { 
    question 
  });
}

// Add admin methods
getAllFAQs() {
  return this.http.get<any[]>('https://vidhyan-education-backend.onrender.com/api/faqs');
}

addFAQ(newFAQ: any) {
  return this.http.post('https://vidhyan-education-backend.onrender.com/api/faqs', newFAQ);
}
}
