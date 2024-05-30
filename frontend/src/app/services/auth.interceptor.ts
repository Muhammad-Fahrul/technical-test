import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const accessToken = authService.getAccessToken();
  const authReq = accessToken
    ? req.clone({ setHeaders: { authorization: `Bearer ${accessToken}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        return authService.refreshToken().pipe(
          switchMap((token) => {
            const clonedReq = req.clone({
              setHeaders: { authorization: `Bearer ${token.data.accessToken}` },
            });
            return next(clonedReq);
          }),
          catchError((err) => {
            authService.logout();
            router.navigate(['/unauthorized']);
            return EMPTY; // Berhenti melanjutkan setelah navigasi
          })
        );
      }
      return throwError(() => new Error(error.message));
    })
  );
};
