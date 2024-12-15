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

    getAllAbuseKey():Observable<AbuseDbKeyResponse[]>{
        return this.httpclient.get<AbuseDbKeyResponse[]>(this.apiUrl+"get-all",{headers:this.authService.getHeaders()});
    }
    addAbuseKey(abuseDbKeyRequest:AbuseDbKeyRequest):Observable<AbuseDbKeyResponse>{
        return this.httpclient.post<AbuseDbKeyResponse>(this.apiUrl+"add",abuseDbKeyRequest,{headers:this.authService.getHeaders()});
    }
    deleteAbuseKey(id:number):Observable<boolean>{
        return this.httpclient.delete<boolean>(this.apiUrl+'delete/'+id,{headers:this.authService.getHeaders()})
    }
}
