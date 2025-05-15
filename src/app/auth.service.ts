
// // src/app/auth.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'https://vidhyan-education-backend.onrender.com/api';
//   // private apiUrl = 'http://localhost:3000/api';

//   private currentUserSubject = new BehaviorSubject<any>(null);
//   public currentUser = this.currentUserSubject.asObservable();

//   private showLoginSubject = new BehaviorSubject<boolean>(false);
//   private showRegisterSubject = new BehaviorSubject<boolean>(false);

//   public showLogin$ = this.showLoginSubject.asObservable();
//   public showRegister$ = this.showRegisterSubject.asObservable();

//   constructor(private http: HttpClient, private router: Router) {
//     const token = localStorage.getItem('token');
//     if (token) {
//       this.getCurrentUser().subscribe();
//     }
//   }

//   // 👇 Updated: register now accepts name too
//   register(name: string, email: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, { name, email, password }).pipe(
//       tap((res: any) => {
//         localStorage.setItem('token', res.token);
//         this.currentUserSubject.next(res.user);
//       })
//     );
//   }

//   login(email: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
//       tap((res: any) => {
//         localStorage.setItem('token', res.token);
//         this.currentUserSubject.next(res.user);
//       })
//     );
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.currentUserSubject.next(null);
//     this.router.navigate(['/']);
//   }

//   getCurrentUser(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/me`).pipe(
//       tap((user: any) => this.currentUserSubject.next(user))
//     );
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   isAuthenticated(): boolean {
//     return !!this.getToken();
//   }

//   // Modal control
//   showLoginModal(): void {
//     this.showLoginSubject.next(true);
//     this.showRegisterSubject.next(false);
//   }

//   showRegisterModal(): void {
//     this.showRegisterSubject.next(true);
//     this.showLoginSubject.next(false);
//   }

//   closeModals(): void {
//     this.showLoginSubject.next(false);
//     this.showRegisterSubject.next(false);
//   }

//   loginWithGoogle(token: string): Observable<any> {
//   return this.http.post(`${this.apiUrl}/google-login`, { tokenId: token }).pipe(
//     tap((res: any) => {
//       localStorage.setItem('token', res.token);
//       localStorage.setItem('userEmail', res.user.email); // ✅ Save user email
//       this.currentUserSubject.next(res.user);
//     })
//   );
// }

  
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'https://vidhyan-education-backend.onrender.com/api';
  private apiUrl = 'http://localhost:3000/api';

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  private showLoginSubject = new BehaviorSubject<boolean>(false);
  private showRegisterSubject = new BehaviorSubject<boolean>(false);

  public showLogin$ = this.showLoginSubject.asObservable();
  public showRegister$ = this.showRegisterSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.getCurrentUser().subscribe();
    }
  }

  // 👇 Register user and save token + user info
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.user.name); // ✅ Store user name
        localStorage.setItem('userEmail', res.user.email); // ✅ Store email
        this.currentUserSubject.next(res.user);
      })
    );
  }

  // 👇 Normal login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.user.name); // ✅ Store user name
        localStorage.setItem('userEmail', res.user.email); // ✅ Store email
        this.currentUserSubject.next(res.user);
      })
    );
  }

  // 👇 Google OAuth login
  loginWithGoogle(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/google-login`, { tokenId: token }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.user.name); // ✅ Store user name
        localStorage.setItem('userEmail', res.user.email); // ✅ Store email
        this.currentUserSubject.next(res.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`).pipe(
      tap((user: any) => {
        this.currentUserSubject.next(user);
        // Backup: ensure name/email is stored (if not already)
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Modal control
  showLoginModal(): void {
    this.showLoginSubject.next(true);
    this.showRegisterSubject.next(false);
  }

  showRegisterModal(): void {
    this.showRegisterSubject.next(true);
    this.showLoginSubject.next(false);
  }

  closeModals(): void {
    this.showLoginSubject.next(false);
    this.showRegisterSubject.next(false);
  }
}

