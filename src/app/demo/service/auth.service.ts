import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  AuthenticationRequest, AuthenticationResponse } from '../models/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly TOKEN_KEY = 'authToken';
    private apiUrl = environment.apiUrl + 'authentication/';
    private token:string;
    private username:string;
    constructor(private httpClient: HttpClient,
    ) {}
    login(
        authenticationRequest: AuthenticationRequest
    ){
        console.log("token almaya geldi.")
        this.httpClient.post<AuthenticationResponse>(
            this.apiUrl+'login',
            authenticationRequest
        ).subscribe({
            next:(data)=>{
                let token ="Bearer "+data.token;
                this.saveToken(token);    
            }
        });
    }
    saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        this.token=token;
    }
    
    saveUsername(username:string):void{
        localStorage.setItem('username',username);
        this.username=username;
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.token=null;
        this.username=null;
    }
    
    getToken():string{
        return localStorage.getItem(this.TOKEN_KEY);
    }
    getUsername():string{
        return localStorage.getItem('username');
    }
    isAuthenticated():boolean{
        this.token= this.getToken();
        this.username=this.getUsername();
        return !!this.token;
    }

    getHeaders(): HttpHeaders {
        if(!this.isAuthenticated()){
            this.login({username:'onurerkan',password:'1234'})
        }
                        
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.token,
        });
    }
}
