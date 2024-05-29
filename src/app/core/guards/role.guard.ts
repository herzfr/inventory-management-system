import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole: string[] = route.data['expectedRole'];
  const userRole = authService.getRoles();

  if (userRole.some(e => expectedRole.some(r => r.includes(e)))) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
