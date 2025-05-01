// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Determine custom message based on the target route
    let message = 'Please login to continue.';
    if (state.url.includes('quiz')) {
      message = 'Please login to know your best career!';
    } else if (state.url.includes('results')) {
      message = 'Please login to view your results!';
    } else if (state.url.includes('compare')) {
      message = 'Please login to compare colleges!';
    }

    router.navigate(['/login'], {
      queryParams: { message }
    });
    return false;
  }
};
