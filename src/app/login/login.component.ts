import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';  // <-- add ActivatedRoute here
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var google: any; // Google SDK

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  email = '';
  password = '';
  error = '';
  message = '';  // <-- add message

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute  // <-- inject ActivatedRoute
  ) {}

  ngOnInit() {
    // Listen for query parameters (to show messages if redirected)
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.message = params['message'];
        alert(this.message);  // 🔥 popup message
      }
    });

    // Setup the global callback
    (window as any).handleCredentialResponse = (response: any) => {
      const token = response.credential;
      this.authService.loginWithGoogle(token).subscribe(
        () => this.router.navigate(['/']),
        err => this.error = err.error.error || 'Google login failed'
      );
    };
  }

  ngAfterViewInit() {
    // Initialize Google login after the view loads
    google.accounts.id.initialize({
      client_id: '522601168090-sa10slo3426u4689pt49salsi784tcbe.apps.googleusercontent.com',
      callback: (response: any) => (window as any).handleCredentialResponse(response)
    });

    // Render the Google button into #google-button div
    google.accounts.id.renderButton(
      document.getElementById('google-button'),
      {
        theme: 'outline',
        size: 'large',
        shape: 'rectangular',
        width: '100%'
      }
    );
  }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      () => this.router.navigate(['/']),
      err => this.error = err.error.error || 'Login failed'
    );
  }
}
