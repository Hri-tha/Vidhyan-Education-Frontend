import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'https://vidhyan-education-backend.onrender.com/api'; // Update this with your backend URL

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/questions`);
  }

  submitAnswers(answers: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit`, { answers });
  }
}