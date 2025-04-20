import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  successMessage: string | null = null;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.successMessage = 'You have successfully registered!';

        // Immediately remove 'registered' from URL
        this.router.navigate([], {
          queryParams: { registered: null },
          queryParamsHandling: 'merge',
          replaceUrl: true
        });

        // Hide the success message after 1 second
        setTimeout(() => {
          this.successMessage = null;
        }, 1000);
      }
    });
  }

  takeTestAgain(): void {
    this.router.navigate(['/quiz']);
  }

  openLogin(): void {
    this.authService.showLoginModal();
  }

  openRegister(): void {
    this.authService.showRegisterModal();
  }
}
