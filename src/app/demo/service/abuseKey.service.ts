import { AbuseDbKeyRequest, AbuseDbKeyResponse } from '../models/abuse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResult } from '../models/result';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AbuseKeyService {
    private apiUrl = environment.apiUrl + 'abuse-key/';
    constructor(private httpclient: HttpClient,private authService:AuthService) {}

    getAllAbuseKey():Observable<DataResult<AbuseDbKeyResponse[]>>{
        return this.httpclient.get<DataResult<AbuseDbKeyResponse[]>>(this.apiUrl+"get-all",{headers:this.authService.getHeaders()});
    }
    addAbuseKey(abuseDbKeyRequest:AbuseDbKeyRequest):Observable<DataResult<AbuseDbKeyResponse>>{
        return this.httpclient.post<DataResult<AbuseDbKeyResponse>>(this.apiUrl+"add",abuseDbKeyRequest,{headers:this.authService.getHeaders()});
    }
}
