import { LogListenerStatus } from './../models/logListener';
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
    private apiUrl = environment.apiUrl + 'log-listener/';
    private options = {
        headers:this.authService.getHeaders(),
    }
    constructor(private httpclient: HttpClient,private authService:AuthService) {}
    start():Observable<Result>{
        return this.httpclient.post<Result>(this.apiUrl+'start',null,this.options);
    }
    stop():Observable<Result>{
        return this.httpclient.post<Result>(this.apiUrl+'stop',null,this.options);
    }
    status():Observable<DataResult<LogListenerStatus>>{
        return this.httpclient.get<DataResult<LogListenerStatus>>(this.apiUrl+'status',this.options);
    }
}
