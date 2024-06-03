import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  AuthenticationRequest, AuthenticationResponse } from '../models/auth';
import { DataResult } from '../models/result';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly TOKEN_KEY = 'authToken';
    private apiUrl = environment.apiUrl + 'authentication/';
    constructor(private httpClient: HttpClient) {}
    login(
        authenticationRequest: AuthenticationRequest
    ): Observable<DataResult<AuthenticationResponse>> {
        return this.httpClient.post<DataResult<AuthenticationResponse>>(
            this.apiUrl+'login',
            authenticationRequest
        );
    }
    async loginAndToken (authenticationRequest: AuthenticationRequest) {
        try {
            const response = await lastValueFrom(
                this.login(authenticationRequest)
            );
            if (response.success) {
                const token = response.data.token;
                this.saveToken(token);
            } else {
                console.error('authentication failed:', response.message);
            }
        } catch (error) {
            console.error(error);
        }
    }
    saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    getHeaders(): HttpHeaders {
        this.loginAndToken({username:'onur',password:'1234'})
        const token = 'Bearer '+localStorage.getItem(this.TOKEN_KEY);
        console.log(token);
        if (token) {
            return new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': token,
            });
        } else {
            return new HttpHeaders({
                'Content-Type': 'application/json',
            });
        }
    }
}
