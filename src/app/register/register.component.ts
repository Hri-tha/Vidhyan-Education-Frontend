// src/app/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  message = '';
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 👇 Listen for query params when the component loads
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.message = params['message'];
        alert(this.message); // 🔥 Show popup
      }
    });
  }

  onSubmit(): void {
    if (!this.name || this.name.trim().length < 3) {
      this.error = 'Full Name must be at least 3 characters.';
      return;
    }

    if (!this.email || !this.validateEmail(this.email)) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    if (!this.password || this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match!';
      return;
    }

    this.authService.register(this.name, this.email, this.password).subscribe(
      () => {
        this.error = '';
        this.router.navigate(['/'], { queryParams: { registered: 'true' } });
      },
      err => {
        this.error = err.error?.error || 'Registration failed.';
      }
    );
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  }
}
