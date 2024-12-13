import { AbuseBlackListResponse, AbuseCheckRequest, AbuseCheckResponse } from '../models/abuse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResult, Result } from '../models/result';
import { AuthService } from './auth.service';
import { LogListenerRegexRequest, LogListenerRegexResponse } from '../models/regex';

@Injectable({
    providedIn: 'root',
})
export class RegexService {
    private apiUrl = environment.apiUrl + 'logPattern/';
    constructor(private httpclient: HttpClient,private authService:AuthService) {}

    addLogPattern(logListenerRegexRequest:LogListenerRegexRequest):Observable<boolean>{
        return this.httpclient.post<boolean>(this.apiUrl+"add",logListenerRegexRequest,{headers:this.authService.getHeaders()});
    }
    updateLogPattern(id:number,logListenerRegexRequest:LogListenerRegexRequest):Observable<boolean>{
        return this.httpclient.patch<boolean>(this.apiUrl+"update/"+id,logListenerRegexRequest,{headers:this.authService.getHeaders()});
    }
    deleteLogPattern(id:number):Observable<boolean>{
        return this.httpclient.delete<boolean>(this.apiUrl+"delete/"+id,{headers:this.authService.getHeaders()});
    }
    getAllLogPattern():Observable<LogListenerRegexResponse[]>{
        return this.httpclient.get<LogListenerRegexResponse[]>(this.apiUrl+"getAll",{headers:this.authService.getHeaders()});
    }

}
