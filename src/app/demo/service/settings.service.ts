import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { SettingResponse } from '../models/settings';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    private apiUrl = environment.apiUrl + 'settings/';
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) {}

    getByKey(key: string): Observable<SettingResponse> {
        return this.httpClient.get(this.apiUrl + 'get/key/' + key, {
            headers: this.authService.getHeaders(),
        });
    }
    getAll(): Observable<SettingResponse[]> {
        return this.httpClient.get<SettingResponse[]>(this.apiUrl + 'get/all', {
            headers: this.authService.getHeaders(),
        });
    }
    getAllBySettingType(type: string): Observable<SettingResponse[]> {
        return this.httpClient.get<SettingResponse[]>(
            this.apiUrl + 'get/setting-type/' + type,
            {
                headers: this.authService.getHeaders(),
            }
        );
    }
    updateSetting(key: string, value: string): Observable<SettingResponse> {
        return this.httpClient.patch(
            this.apiUrl + 'update/' + key + '/' + value,
            null,
            { headers: this.authService.getHeaders() }
        );
    }
}
