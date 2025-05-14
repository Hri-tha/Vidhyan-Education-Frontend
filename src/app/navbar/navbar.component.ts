import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    this.isAdmin = email === 'hrithikkthakurdbg@gmail.com';
  }

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
