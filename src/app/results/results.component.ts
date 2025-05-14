// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// interface CareerResult {
//   name: string;
//   score: number;
//   description: string;
// }

// @Component({
//   selector: 'app-results',
//   templateUrl: './results.component.html',
//   styleUrls: ['./results.component.scss'],
//   imports: [CommonModule]
// })
// export class ResultsComponent implements OnInit {
//   topCareers: CareerResult[] = [];
//   bestCareer: CareerResult | null = null;
//   maxPossibleScore = 16; // You can calculate this dynamically if needed
//   showPopup = true;

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     const state = history.state.results || null;

//     if (state && state.top3 && state.best) {
//       this.topCareers = state.top3;
//       this.bestCareer = state.best;
//     } else {
//       console.warn('⚠️ No results found in history.state');
//     }
//   }

//   closePopup(): void {
//     this.showPopup = false;
//   }

//   takeTestAgain(): void {
//     this.router.navigate(['/']); // Redirect to home or quiz
//   }
// }
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface CareerResult {
  name: string;
  score: number;
  description: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ResultsComponent implements OnInit {
  topCareers: CareerResult[] = [];
  bestCareer: CareerResult | null = null;
  maxPossibleScore = 16;
  showPopup = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state?.results || null;

    if (state && state.top3 && state.best) {
      // Handle if top3 is not an array
      if (Array.isArray(state.top3)) {
        this.topCareers = state.top3;
      } else if (typeof state.top3 === 'object') {
        this.topCareers = Object.values(state.top3);
      } else {
        console.warn('⚠️ Invalid top3 format');
      }

      // Ensure bestCareer is valid
      if (typeof state.best === 'object') {
        this.bestCareer = state.best;
      } else {
        console.warn('⚠️ Invalid best career format');
      }
    } else {
      console.warn('⚠️ No results found in history.state');
    }
  }

  closePopup(): void {
    this.showPopup = false;
  }

  takeTestAgain(): void {
    this.router.navigate(['/']);
  }
}
