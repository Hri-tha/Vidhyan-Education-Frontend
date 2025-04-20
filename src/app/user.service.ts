import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  updateCareer(bestCareer: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/me/career`, { bestCareer });
  }
}