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

    addServer(serverRequest:ServerRequest):Observable<ServerResponse>{
        const options= {
            headers:this.authService.getHeaders(),
        }
        return this.httpclient.post<ServerResponse>(this.apiUrl+"add",serverRequest,options);
    }
    sendBlockConf():Observable<Result[]>{
        return this.httpclient.get<Result[]>(this.apiUrl+"sendBlockConf",{headers:this.authService.getHeaders()});
    }
    getAllServer():Observable<ServerResponse[]>{
        return this.httpclient.get<ServerResponse[]>(this.apiUrl+"get-all",{headers:this.authService.getHeaders()});
    }
    deleteServerById(id:number):Observable<boolean>{
        return this.httpclient.delete<boolean>(this.apiUrl+"delete/"+id,{headers:this.authService.getHeaders()});
    }
    deleteServerByIdList(idList:number[]):Observable<boolean>{
        const options={
            headers:this.authService.getHeaders(),
            body:idList
        }
        return this.httpclient.request<boolean>("delete",this.apiUrl+"delete",options)
    }
}
