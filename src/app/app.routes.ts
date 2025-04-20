// // import { Routes } from '@angular/router';
// // import { HomeComponent } from './home/home.component';
// // import { QuizComponent } from './quiz/quiz.component';
// // import { ResultsComponent } from './results/results.component';

// // export const routes: Routes = [
// //   { path: '', component: HomeComponent },
// //   { path: 'quiz', component: QuizComponent },
// //   { path: 'results', component: ResultsComponent },
// //   { path: '**', redirectTo: '' }
// // ];
// import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { QuizComponent } from './quiz/quiz.component';
// import { ResultsComponent } from './results/results.component';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'quiz', component: QuizComponent },
//   { path: 'results', component: ResultsComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: '**', redirectTo: '' }
// ];

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard'; // 👉 import the guard

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent, canActivate: [authGuard] }, // 🔥 protect quiz
  { path: 'results', component: ResultsComponent, canActivate: [authGuard] }, // 🔥 protect results
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
