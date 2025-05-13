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
  imports: [CommonModule]
})
export class ResultsComponent implements OnInit {
  topCareers: CareerResult[] = [];
  bestCareer: CareerResult | null = null;
  maxPossibleScore = 16; // You can calculate this dynamically if needed
  showPopup = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state.results || null;

    if (state && state.top3 && state.best) {
      this.topCareers = state.top3;
      this.bestCareer = state.best;
    } else {
      console.warn('⚠️ No results found in history.state');
    }
  }

  closePopup(): void {
    this.showPopup = false;
  }

  takeTestAgain(): void {
    this.router.navigate(['/']); // Redirect to home or quiz
  }
}
