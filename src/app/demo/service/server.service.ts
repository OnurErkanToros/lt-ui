import { ServerRequest, ServerResponse } from './../models/server';
import { AbuseBlackListResponse, AbuseCheckRequest, AbuseCheckResponse } from '../models/abuse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResult, Result } from '../models/result';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class ServerService {
    private apiUrl = environment.apiUrl + 'server/';
    constructor(private httpclient: HttpClient,private authService:AuthService) {}

    addServer(serverRequest:ServerRequest):Observable<DataResult<ServerResponse>>{
        return this.httpclient.post<DataResult<ServerResponse>>(this.apiUrl+"add",serverRequest);
    }
    sendBlockConf():Observable<Result[]>{
        return this.httpclient.get<Result[]>(this.apiUrl+"sendBlockConf",{headers:this.authService.getHeaders()});
    }
    getAllServer():Observable<DataResult<ServerResponse[]>>{
        return this.httpclient.get<DataResult<ServerResponse[]>>(this.apiUrl+"getAll",{headers:this.authService.getHeaders()});
    }
    deleteServerById(id:number):Observable<Result>{
        return this.httpclient.delete<Result>(this.apiUrl+"delete/"+id,{headers:this.authService.getHeaders()});
    }
}
