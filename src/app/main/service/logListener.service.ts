import { LogListenerStatus } from '../models/logListener';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class LogListenerService {
    private apiUrl = environment.apiUrl + 'log-listener/';
    private options = {
        headers: this.authService.getHeaders(),
    };
    constructor(
        private httpclient: HttpClient,
        private authService: AuthService
    ) {}
    start(): Observable<boolean> {
        return this.httpclient.post<boolean>(
            this.apiUrl + 'start',
            null,
            this.options
        );
    }
    stop(): Observable<boolean> {
        return this.httpclient.post<boolean>(
            this.apiUrl + 'stop',
            null,
            this.options
        );
    }
    status(): Observable<LogListenerStatus> {
        return this.httpclient.get<LogListenerStatus>(
            this.apiUrl + 'status',
            this.options
        );
    }
}
