import {
    AllSuspectIpRequest,
    AllSuspectIpResponse,
} from '../models/suspectIp';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResult } from '../models/result';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page';

@Injectable({
    providedIn: 'root',
})
export class AllSuspectIpService {
    private apiUrl = environment.apiUrl + 'all-suspect-ip/';
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}
    getAll(
        page: number,
        size: number
    ): Observable<DataResult<Page<AllSuspectIpResponse>>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.httpClient.get<DataResult<Page<AllSuspectIpResponse>>>(
            this.apiUrl + 'get-all',
            { headers: this.authService.getHeaders(), params }
        );
    }
    getBannedIpList(
        page: number,
        size: number
    ): Observable<DataResult<Page<AllSuspectIpResponse>>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.httpClient.get<DataResult<Page<AllSuspectIpResponse>>>(
            this.apiUrl + 'get-banned-ip-list',
            { headers: this.authService.getHeaders(), params }
        );
    }
    getUnbannedIpList(
        page: number,
        size: number
    ): Observable<DataResult<Page<AllSuspectIpResponse>>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.httpClient.get<DataResult<Page<AllSuspectIpResponse>>>(
            this.apiUrl + 'get-unbanned-ip-list',
            { headers: this.authService.getHeaders(), params }
        );
    }
    addSuspectIp(
        request: AllSuspectIpRequest
    ): Observable<DataResult<AllSuspectIpResponse>> {
        return this.httpClient.post<DataResult<AllSuspectIpResponse>>(
            this.apiUrl + 'add-new-suspect-ip',
            request,
            {headers:this.authService.getHeaders()}
        );
    }
}
