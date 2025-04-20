import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class QuizComponent implements OnInit {
  Math = Math; 

  questions: any[] = [];
  currentPage = 0;
  pageSize = 5;
  pagedQuestions: any[] = [];
  answers: (number | null)[] = [];
  options = [
    { label: 'Agree', value: 2 },
    { label: 'Not sure', value: 1 },
    { label: 'Disagree', value: 0 }
  ];

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizService.getQuestions().subscribe(questions => {
      this.questions = questions;
      this.answers = new Array(questions.length).fill(null);
      this.updatePagedQuestions();
    });
  }

  updatePagedQuestions(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedQuestions = this.questions.slice(start, end);
  }

  selectOption(questionIndex: number, value: number): void {
    const globalIndex = this.currentPage * this.pageSize + questionIndex;
    this.answers[globalIndex] = value;
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.questions.length) {
      this.currentPage++;
      this.updatePagedQuestions();
      this.scrollToTop();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagedQuestions();
      this.scrollToTop();
    }
  }

  submitQuiz(): void {
    this.quizService.submitAnswers(this.answers).subscribe(response => {
      this.router.navigate(['/results'], { state: { results: response } });
      this.scrollToTop();
    });
  }

  allQuestionsAnsweredOnPage(): boolean {
    const start = this.currentPage * this.pageSize;
    const end = Math.min(start + this.pageSize, this.answers.length);
    return this.answers.slice(start, end).every(answer => answer !== null);
  }

  isLastPage(): boolean {
    return (this.currentPage + 1) * this.pageSize >= this.questions.length;
  }

  get progressPercentage(): number {
    const answeredCount = this.answers.filter(a => a !== null).length;
    return (answeredCount / this.questions.length) * 100;
  }

  // Scrolls the page to the top
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
