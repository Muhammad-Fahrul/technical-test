import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:5000/api';

  post(url: string, body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${url}`, body, {
      withCredentials: true,
    });
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${url}`, body, {
      withCredentials: true,
    });
  }

  delete(url: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${url}`, {
      withCredentials: true,
    });
  }

  get(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}`, {
      withCredentials: true,
    });
  }
}
