import {
    AllSuspectIpRequest,
    AllSuspectIpResponse,
    SuspectIpResponse,
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
export class SuspectIpService {
    private apiUrl = environment.apiUrl + 'suspect-ip/';
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}
    getAll(
        page: number,
        size: number
    ): Observable<DataResult<Page<SuspectIpResponse>>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.httpClient.get<DataResult<Page<SuspectIpResponse>>>(
            this.apiUrl + 'get-all',
            { headers: this.authService.getHeaders(), params }
        );
    }
}
