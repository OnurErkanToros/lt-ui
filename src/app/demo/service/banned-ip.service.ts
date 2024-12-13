import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page';
import { BannedIpResponse } from '../models/banned-ip';

@Injectable({
    providedIn: 'root',
})
export class BannedIpService {
    private apiUrl = environment.apiUrl + 'banned-ip/';
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}
    getAll(
        page: number,
        size: number
    ): Observable<Page<BannedIpResponse>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.httpClient.get<Page<BannedIpResponse>>(
            this.apiUrl + 'get-all',
            { headers: this.authService.getHeaders(), params }
        );
    }
    getUntransferredCount():Observable<number>{
        return this.httpClient.get<number>(this.apiUrl+'untransferred-count',{headers:this.authService.getHeaders()})
    }
}
