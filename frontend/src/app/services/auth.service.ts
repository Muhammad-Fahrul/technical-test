import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;
  private authSubject = new BehaviorSubject<string | null>(null);
  authState$ = this.authSubject.asObservable();

  constructor(private apiService: ApiService) {}

  login(credential: {username: string, password: string}): Observable<any> {
    return this.apiService.post('/auths', credential).pipe(
      tap((response: any) => {
        this.setAccessToken(response.data.accessToken);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    this.setAccessToken(null);
  }

  private setAccessToken(token: string | null) {
    this.accessToken = token;
    this.authSubject.next(this.accessToken);
  }

  refreshToken(): Observable<any> {
    return this.apiService.get('/auths/refresh').pipe(
      tap((response: any) => {
        this.setAccessToken(response.data.accessToken);
      }),
      catchError((error) => {
        this.logout();
        return of(null);
      })
    );
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private handleError(error: any): Observable<never> {
    // Handle error appropriately here
    throw error;
  }
}
