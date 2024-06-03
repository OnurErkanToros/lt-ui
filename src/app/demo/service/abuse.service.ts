import { AbuseBlackListResponse, AbuseCheckRequest, AbuseCheckResponse } from '../models/abuse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResult } from '../models/result';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AbuseService {
    private apiUrl = environment.apiUrl + 'abuse/';
    constructor(private httpclient: HttpClient,private authService:AuthService) {}

    checkIp(abuseCheckRequestDto: AbuseCheckRequest): Observable<DataResult<AbuseCheckResponse>> {
        return this.httpclient.get<DataResult<AbuseCheckResponse>>(this.apiUrl + 'checkIp');
    }
    refreshBlackList(): Observable<DataResult<AbuseBlackListResponse[]>> {
        return this.httpclient.get<DataResult<AbuseBlackListResponse[]>>(this.apiUrl + 'blackList/refresh',{headers:this.authService.getHeaders()});
    }
    getAllBlackList(): Observable<DataResult<AbuseBlackListResponse[]>> {
        console.log(this.authService.getHeaders())
        return this.httpclient.get<DataResult<AbuseBlackListResponse[]>>(this.apiUrl + "blackList/all",{headers:this.authService.getHeaders()});
    }

}
