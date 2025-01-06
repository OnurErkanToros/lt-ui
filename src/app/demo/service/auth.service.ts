import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationRequest, AuthenticationResponse } from '../models/auth';
import { catchError, map, Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly TOKEN_KEY = 'authToken';
    private apiUrl = environment.apiUrl + 'authentication/';
    private username: string;
    constructor(private httpClient: HttpClient) {}
    login(authenticationRequest: AuthenticationRequest): Observable<boolean> {
        return this.httpClient
            .post<AuthenticationResponse>(
                this.apiUrl + 'login',
                authenticationRequest
            )
            .pipe(
                map((data) => {
                    this.saveToken(data.token);
                    this.saveUsername(data.username);
                    return true;
                }),
                catchError((error) => {
                    console.error('Login error', error);
                    return of(false);
                })
            );
    }
    saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    saveUsername(username: string): void {
        localStorage.setItem('username', username);
        this.username = username;
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem('username');
    }

    getToken(): string {
        return localStorage.getItem(this.TOKEN_KEY);
    }
    getUsername(): string {
        return localStorage.getItem('username');
    }
    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }

        try {
            // Token'i decode edip süresini kontrol et
            const decodedToken: any = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000); // Şu anki zaman (saniye olarak)
            return decodedToken.exp > currentTime; // Süresi dolmamışsa true döner
        } catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    }

    getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.getToken(),
        });
    }
}
