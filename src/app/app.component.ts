import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component'; // <-- import LoaderComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    LoaderComponent // <-- add LoaderComponent here
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) { }
  
  openLogin(): void {
    this.router.navigate(['/login']);
  }

  openRegister(): void {
    this.router.navigate(['/register']);
  }
}
