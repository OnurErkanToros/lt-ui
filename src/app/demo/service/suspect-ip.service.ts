import {
    SuspectIpResponse,
} from '../models/suspectIp';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResult, Result } from '../models/result';
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
    getAll(
        page: number,
        size: number
    ): Observable<Page<SuspectIpResponse>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());
        return this.httpClient.get<Page<SuspectIpResponse>>(
            this.apiUrl + 'get-all',
            { headers: this.authService.getHeaders(), params }
        );
    }
    prepareSuspectIpForBan(suspectIpList:BanIpRequest[]):Observable<boolean>{
        return this.httpClient.post<boolean>(this.apiUrl+'ban',null,{headers:this.authService.getHeaders()});
    }
}
