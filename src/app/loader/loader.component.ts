// import { Component } from '@angular/core';
// import { LoaderService } from '../loader.service';
// import { Observable } from 'rxjs'; // important

// @Component({
//   selector: 'app-loader',
//   templateUrl: './loader.component.html',
//   styleUrls: ['./loader.component.scss']
// })
// export class LoaderComponent {
//   isLoading!: Observable<boolean>; // declare properly

//   constructor(private loaderService: LoaderService) {}

//   ngOnInit() {
//     this.isLoading = this.loaderService.isLoading;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- ADD this import
import { LoaderService } from '../loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true, // <-- also add this if missing
  imports: [CommonModule], // <-- IMPORTANT
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading!: Observable<boolean | null>;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.isLoading = this.loaderService.isLoading;
  }
}
