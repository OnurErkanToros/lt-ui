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
import { CountryResponse } from '../models/country';

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    private apiUrl = environment.apiUrl + 'geo-ip-countries/';
    constructor(
        private httpclient: HttpClient,
        private authService: AuthService
    ) {}
    getCountries(
    ): Observable<CountryResponse[]> {
        return this.httpclient.get<CountryResponse[]>(
            this.apiUrl + 'countries',
            { headers: this.authService.getHeaders() }
        );
    }

    setAllowIDs(ids: number[]): Observable<CountryResponse[]> {
        return this.httpclient.post<CountryResponse[]>(
            this.apiUrl + 'allow',
            ids,
            { headers: this.authService.getHeaders() }
        )
    }
    setDenyIDs(ids: number[]): Observable<CountryResponse[]> {
        return this.httpclient.post<CountryResponse[]>(
            this.apiUrl + 'deny',
            ids,
            { headers: this.authService.getHeaders() }
        )
    }
}
