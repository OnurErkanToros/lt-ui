import { ServerRequest, ServerResponse } from './../models/server';
import { HttpClient } from '@angular/common/http';
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
        const options= {
            headers:this.authService.getHeaders(),
        }
        return this.httpclient.post<DataResult<ServerResponse>>(this.apiUrl+"add",serverRequest,options);
    }
    sendBlockConf():Observable<Result[]>{
        return this.httpclient.get<Result[]>(this.apiUrl+"sendBlockConf",{headers:this.authService.getHeaders()});
    }
    getAllServer():Observable<DataResult<ServerResponse[]>>{
        return this.httpclient.get<DataResult<ServerResponse[]>>(this.apiUrl+"get-all",{headers:this.authService.getHeaders()});
    }
    deleteServerById(id:number):Observable<Result>{
        return this.httpclient.delete<Result>(this.apiUrl+"delete/"+id,{headers:this.authService.getHeaders()});
    }
    deleteServerByIdList(idList:number[]):Observable<Result>{
        const options={
            headers:this.authService.getHeaders(),
            body:idList
        }
        return this.httpclient.request<Result>("delete",this.apiUrl+"delete",options)
    }
}
