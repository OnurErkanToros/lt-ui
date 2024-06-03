import { AbuseBlackListResponse, AbuseCheckRequest, AbuseCheckResponse } from '../models/abuse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResult, Result } from '../models/result';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class LogListenerService {
    private apiUrl = environment.apiUrl + 'server/';
    constructor(private httpclient: HttpClient,private authService:AuthService) {}
    logListenerStart():Observable<Result>{
        return this.httpclient.post<Result>(this.apiUrl,{headers:this.authService.getHeaders()});
    }
    logListenerStop():Observable<Result>{
        return this.httpclient.post<Result>(this.apiUrl,{headers:this.authService.getHeaders()})
    }
}
