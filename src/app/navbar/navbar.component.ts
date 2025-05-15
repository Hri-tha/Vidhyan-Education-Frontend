import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  private userSub: Subscription | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.currentUser.subscribe(user => {
      const email = user?.email || '';
      this.isAdmin = email === 'hrithikkthakurdbg@gmail.com';
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
