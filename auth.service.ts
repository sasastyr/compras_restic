import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 
  private loggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  loginWithGoogle(): Observable<any> {
    return this.http.get(`${this.apiUrl}/login-with-google`).pipe(
      catchError((error) => {
        console.error('Erro no login', error);
        throw error;
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      catchError((error) => {
        console.error('Erro de autenticação', error);
        throw error;
      })
    );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    this.loggedIn = true;
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
