import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  openLogin() {
    this.authService.showLoginModal();
  }

  openRegister() {
    this.authService.showRegisterModal();
  }

  logout() {
    this.authService.logout();
  }
}
