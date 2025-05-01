import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard'; // 👉 import the guard
import { ChatbotComponent } from './chatbot/chatbot.component';
import { CollegeCompareComponent } from './college-compare/college-compare.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent, canActivate: [authGuard] }, // 🔥 protect quiz
  { path: 'results', component: ResultsComponent, canActivate: [authGuard] }, // 🔥 protect results
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chatbot', component: ChatbotComponent},
  { path: 'compare', component: CollegeCompareComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
