import { SuspectIpResponse } from '../models/suspectIp';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page';
import { BanIpRequest } from '../models/banned-ip';

@Injectable({
    providedIn: 'root',
})
export class SuspectIpService {
    private apiUrl = environment.apiUrl + 'suspect-ip/';
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}
    getFiltered(
        page: number,
        size: number,
        searchCriteria: {
            ipAddress?: string;
            host?: string;
            status?: string;
        } = {}
    ): Observable<Page<SuspectIpResponse>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        if (searchCriteria.ipAddress) {
            params = params.set('ip', searchCriteria.ipAddress);
        }
        if (searchCriteria.host) {
            params = params.set('host', searchCriteria.host);
        }
        if (searchCriteria.status) {
            params = params.set('status', searchCriteria.status);
        }

        return this.httpClient.get<Page<SuspectIpResponse>>(
            this.apiUrl + 'get-all',
            { headers: this.authService.getHeaders(), params }
        );
    }
    setBanSuspectIps(suspectIpList: BanIpRequest[]): Observable<boolean> {
        return this.httpClient.post<boolean>(
            this.apiUrl + 'ban',
            suspectIpList,
            { headers: this.authService.getHeaders() }
        );
    }
    setUnBanSuspectIps(suspectIpList: BanIpRequest[]): Observable<boolean> {
        return this.httpClient.post<boolean>(
            this.apiUrl + 'unban',
            suspectIpList,
            { headers: this.authService.getHeaders() }
        );
    }
}
