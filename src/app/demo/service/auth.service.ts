import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  AuthenticationRequest, AuthenticationResponse } from '../models/auth';
import { DataResult } from '../models/result';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly TOKEN_KEY = 'authToken';
    private apiUrl = environment.apiUrl + 'authentication/';
    constructor(private httpClient: HttpClient,
        private messageService:MessageService
    ) {}
    login(
        authenticationRequest: AuthenticationRequest
    ): Observable<DataResult<AuthenticationResponse>> {
        console.log("token almaya geldi.")
        return this.httpClient.post<DataResult<AuthenticationResponse>>(
            this.apiUrl+'login',
            authenticationRequest
        ).pipe(
            catchError(error => {
                console.log(error);
              let errorMessage = 'Bir hata oluştu.';
              if (error.status === 404) {
                errorMessage = 'Sayfa bulunamadı.';
              } else if (error.status === 500) {
                errorMessage = 'Sunucu hatası.';
              }
              this.messageService.add({severity:'error', detail: errorMessage});
              return throwError(() => new Error(errorMessage));
            })
          );
    }
    async loginAndToken (authenticationRequest: AuthenticationRequest){
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
        this.loginAndToken({username:'onur',password:'1234'});
        let token ="Bearer "+localStorage.getItem(this.TOKEN_KEY);
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
