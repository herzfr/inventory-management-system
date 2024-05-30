import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';
import { ConstantRoute } from 'src/app/shared/const/routes.const';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('AuthGuard: Checking authentication for route:', state.url);

  return authService.isAuthenticated().pipe(
    map(loggedIn => {
      // AuthGuard: User is', loggedIn ? 'authenticated' : 'not authenticated'
      if (loggedIn) {
       // If the user is already logged in and trying to access login page, redirect to inventory
        if (state.url.includes(ConstantRoute.LOGIN)) {;
          router.navigate([ConstantRoute.INVENTORY]);
          return false;
        }
        return true;
      } else {
         // If the user is not logged in and trying to access a protected route, redirect to the login page
        if (state.url.includes(ConstantRoute.LOGIN)) {
          // Allow access to the login page
          return true;
        }
        console.log('AuthGuard: Mengarahkan pengguna tidak terautentikasi ke login');
        return router.createUrlTree([ConstantRoute.LOGIN], {
          queryParams: { loggedOut: true, origUrl: state.url }
        });
      }
    }),
    catchError((err) => {
      console.error('AuthGuard: Terjadi kesalahan saat memeriksa autentikasi', err);
      if (state.url.includes(ConstantRoute.LOGIN)) {
        // Allow access to the login page in case of error
        return of(true);
      }
      return of(router.createUrlTree([ConstantRoute.LOGIN], {
        queryParams: { loggedOut: true, origUrl: state.url }
      }));
    })
  );
};
