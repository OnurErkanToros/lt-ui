import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page';
import { BannedIpResponse } from '../models/banned-ip';
import { BanRequest } from '../models/ban';
import { Result } from '../models/result';

@Injectable({
    providedIn: 'root',
})
export class BannedIpService {
    private apiUrl = environment.apiUrl + 'banned-ip/';
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}
    getFiltered(
        page: number,
        size: number,
        searchCriteria: { ip?: string; ipType?: string }
    ): Observable<Page<BannedIpResponse>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        if (searchCriteria.ip) {
            params = params.set('ip', searchCriteria.ip);
        }
        if (searchCriteria.ipType) {
            params = params.set('ipType', searchCriteria.ipType);
        }

        return this.httpClient.get<Page<BannedIpResponse>>(
            this.apiUrl + 'get-all',
            { headers: this.authService.getHeaders(), params }
        );
    }
    getUntransferredCount(): Observable<number> {
        return this.httpClient.get<number>(
            this.apiUrl + 'untransferred-count',
            { headers: this.authService.getHeaders() }
        );
    }

    syncDBandFile() {
        return this.httpClient.post<boolean>(this.apiUrl + 'sync', null, {
            headers: this.authService.getHeaders(),
        });
    }

    ban(banRequestList:BanRequest[]): Observable<Result[]> {
        return this.httpClient.post<Result[]>(
            this.apiUrl + 'ban',
            banRequestList,
            { headers: this.authService.getHeaders() }
        );
    }
    unban(banRequestList:BanRequest[]): Observable<Result[]> {
        return this.httpClient.post<Result[]>(
            this.apiUrl + 'unban',
            banRequestList,
            { headers: this.authService.getHeaders() }
        );
    }
}
