import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { Observable, catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (state.url.includes('/login')) {
      router.navigate(['/inventory']);
      return false;
    }
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
