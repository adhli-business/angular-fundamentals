import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {
  private loggedIn = false;
  private apiUrl = 'https://reqres.in/api/login';

  constructor(private http: HttpClient) {}

  async login(username: string, password: string): Promise<boolean> {
    const payload = {
      email: username.trim(),
      password: password.trim()
    };

    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1'
    });

    try {
      console.log('Login payload:', payload);

      const response: any = await firstValueFrom(
        this.http.post(this.apiUrl, payload, { headers })
      );

      if (response && response.token) {
        this.loggedIn = true;
        localStorage.setItem('token', response.token);
        return true;
      }

      // fallback jika tidak ada token
      this.loggedIn = false;
      localStorage.removeItem('token');
      return false;

    } catch (err) {
      console.error('Login error:', err);
      this.loggedIn = false;
      localStorage.removeItem('token');
      return false;
    }
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return this.loggedIn || !!localStorage.getItem('token');
  }
}
