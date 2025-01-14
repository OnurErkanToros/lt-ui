import {
    AbuseBlackListResponse,
    AbuseCheckRequest,
    AbuseCheckResponse,
} from '../models/abuse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Page } from '../models/page';
import { BanIpRequest } from '../models/banned-ip';

@Injectable({
    providedIn: 'root',
})
export class AbuseService {
    private apiUrl = environment.apiUrl + 'abuse/';
    constructor(
        private httpclient: HttpClient,
        private authService: AuthService
    ) {}

    checkIp(
        abuseCheckRequestDto: AbuseCheckRequest
    ): Observable<AbuseCheckResponse> {
        const params = new HttpParams()
            .set('maxAgeInDays', abuseCheckRequestDto.maxAgeInDays)
            .set('ipAddress', abuseCheckRequestDto.ipAddress);
        const options = {
            headers: this.authService.getHeaders(),
            params: params,
        };
        return this.httpclient.post<AbuseCheckResponse>(
            this.apiUrl + 'check-ip',
            null,
            options
        );
    }
    refreshBlackList(): Observable<boolean> {
        const options = {
            headers: this.authService.getHeaders(),
        };
        return this.httpclient.post<boolean>(
            this.apiUrl + 'blacklist/refresh',
            null,
            options
        );
    }
    getAllBlackList(
        page: number,
        size: number
    ): Observable<Page<AbuseBlackListResponse>> {
        const params = new HttpParams().set('page', page).set('size', size);
        return this.httpclient.get<Page<AbuseBlackListResponse>>(
            this.apiUrl + 'blacklist/all',
            { headers: this.authService.getHeaders(), params }
        );
    }

    getCountBlacklistStatusNew(): Observable<number> {
        return this.httpclient.get<number>(
            this.apiUrl + 'blacklist/count-new',
            { headers: this.authService.getHeaders() }
        );
    }

    prepareBlackListForBanning(): Observable<boolean> {
        return this.httpclient.post<boolean>(
            this.apiUrl + 'blacklist/ban',
            null,
            { headers: this.authService.getHeaders() }
        );
    }
}
