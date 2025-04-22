
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
  maxPossibleScore = 16; // 15 questions * max 2 points each
  showPopup = true;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { results: { topCareers: CareerResult[], bestCareer: CareerResult } };

    if (state && state.results) {
      this.topCareers = state.results.topCareers;
      this.bestCareer = state.results.bestCareer;
    }
  }

  ngOnInit(): void {}

  closePopup(): void {
    this.showPopup = false;
  }

  takeTestAgain(): void {
    this.router.navigate(['/']); // Navigate to the home page
  }
}
