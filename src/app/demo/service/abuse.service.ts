import {
    AbuseBlackListResponse,
    AbuseCheckRequest,
    AbuseCheckResponse,
} from '../models/abuse';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResult, Result } from '../models/result';
import { AuthService } from './auth.service';
import { MessageService } from 'primeng/api';
import { Page } from '../models/page';

@Injectable({
    providedIn: 'root',
})
export class AbuseService {
    private apiUrl = environment.apiUrl + 'abuse/';
    constructor(
        private httpclient: HttpClient,
        private authService: AuthService,
        private messageService: MessageService
    ) {}

    checkIp(
        abuseCheckRequestDto: AbuseCheckRequest
    ): Observable<DataResult<AbuseCheckResponse>> {
        const params = new HttpParams()
            .set('maxAgeInDays', abuseCheckRequestDto.maxAgeInDays)
            .set('ipAddress', abuseCheckRequestDto.ipAddress);
            const options= {
                headers:this.authService.getHeaders(),
                params:params
            }
        return this.httpclient.post<DataResult<AbuseCheckResponse>>(
            this.apiUrl + 'check-ip',
            null,
            options
        ).pipe(
            catchError(error => {
              let errorMessage = 'Bir hata oluştu.';

              if (error.status === 404) {
                errorMessage = 'Sayfa bulunamadı.';
              } else if (error.status === 500) {
                errorMessage = 'Sunucu hatası.';
              }
              this.messageService.add({severity:'error', detail: errorMessage});
              return throwError(() => new Error(errorMessage));
            })
          );
    }
    refreshBlackList(): Observable<Result> {
        const options= {
            headers:this.authService.getHeaders(),
        }
        return this.httpclient.post<DataResult<AbuseBlackListResponse[]>>(
            this.apiUrl + 'blacklist/refresh',
            null,
            options
        ).pipe(
            catchError(error => {
              let errorMessage = 'Bir hata oluştu.';

              if (error.status === 404) {
                errorMessage = 'Sayfa bulunamadı.';
              } else if (error.status === 500) {
                errorMessage = 'Sunucu hatası.';
              }
              this.messageService.add({severity:'error', detail: errorMessage});
              return throwError(() => new Error(errorMessage));
            })
          );
    }
    getAllBlackList(
        page: number,
        size: number
    ): Observable<DataResult<Page<AbuseBlackListResponse>>> {
        const params = new HttpParams()
            .set('page', page)
            .set('size', size);
        return this.httpclient.get<DataResult<Page<AbuseBlackListResponse>>>(
            this.apiUrl + 'blacklist/all',
            { headers: this.authService.getHeaders(),params }
        ).pipe(
            catchError(error => {
                console.log(error);
              let errorMessage = 'Bir hata oluştu.';
              if (error.status === 404) {
                errorMessage = 'Sayfa bulunamadı.';
              } else if (error.status === 500) {
                errorMessage = 'Sunucu hatası.';
              }
              this.messageService.add({severity:'error', detail: errorMessage});
              return throwError(() => new Error(errorMessage));
            })
          );
    }
}
