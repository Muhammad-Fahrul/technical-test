import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const accessToken = authService.getAccessToken();
  if (accessToken) {
    return true;
  } else {
    // Attempt to refresh the token if it is not present in memory
    return authService.refreshToken().pipe(
      map((response) => {
        if (response) {
          return true;
        } else {
          router.navigate(['/login']);
          return false;
        }
      }),
      catchError((error) => {
        router.navigate(['/login']);
        return of(false);
      })
    );
  }
};
