import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { ServerService } from 'src/app/demo/service/server.service';
import { ServerRequest, ServerResponse } from 'src/app/demo/models/server';
import { DataResult, Result } from 'src/app/demo/models/result';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
})
export class ServerComponent implements OnInit{
    products!: Product[];
    servers:ServerResponse[]=[];
    selectedServers:ServerResponse[]=[];
    loading=false;
    visible=false;
    requestServer:ServerRequest={};
    constructor(
        private serverService:ServerService,
        private messageService:MessageService
    ) {}

    ngOnInit() {
        this.loadServers();
    }

    loadServers(){
        this.loading=true;
        this.serverService.getAllServer()
        .subscribe({
            next:(data:DataResult<ServerResponse[]>)=>{
                if(data.success){
                    this.servers=data.data;
                }else{
                    this.messageService.add({
                        severity:'error',
                        detail:data.message
                    });
                    this.servers=data.data;
                }
                this.loading=false;
            },
            error:(error)=>{
                this.messageService.add({
                    severity:'error',
                    detail:error
                })
                this.loading=false;
            }
        });
    }
    openNewServerDialog(){
        this.visible=true;
    }
    addNewServer(form:NgForm){
        if(form.valid){
            this.serverService.addServer(this.requestServer)
            .subscribe({
                next:(data:DataResult<ServerResponse>)=>{
                    if(data.success){
                        this.messageService.add({
                            severity:'success',
                            detail:data.message
                        });
                        this.requestServer={};
                        this.loadServers();
                        this.visible=false;
                    }else{
                        this.messageService.add({
                            severity:'error',
                            detail:data.message
                        })
                    }
                },error:error=>{
                    let errorMsg = 'Bir hata oluştu.';
                    if (error.error instanceof ErrorEvent) {
                        // Client-side error
                        errorMsg = `Hata: ${error.error.message}`;
                    } else {
                        // Server-side error
                        if (error.error && error.error.message) {
                            errorMsg = `Hata: ${error.error.message}`;
                        } else if (error.status) {
                            errorMsg = `Hata Kodu: ${error.status}\nMesaj: ${error.message}`;
                        }
                    }
                    this.messageService.add({
                        severity: 'error',
                        detail: errorMsg
                    });
                }
            }
            )
        }else{
            this.messageService.add({
                severity:'warn',
                detail:'Lütfen gerekli alanları doldurun.'
            })
        }
    }
    deleteSelectedServers(){
        let idList:number[]=[];
        this.selectedServers.forEach(item=>{
            idList.push(item.id);
        });
        this.serverService.deleteServerByIdList(idList)
        .subscribe({
            next:(data:Result)=>{
                if(data.success){
                    this.messageService.add({
                        severity:'success',
                        detail:data.message
                    });
                    this.selectedServers=[]
                    this.loadServers();
                }else{
                    this.messageService.add({
                        severity:'error',
                        detail:data.message
                    });
                }
            },error:error=>{
                let errorMsg = 'Bir hata oluştu.';
                    if (error.error instanceof ErrorEvent) {
                        // Client-side error
                        errorMsg = `Hata: ${error.error.message}`;
                    } else {
                        // Server-side error
                        if (error.error && error.error.message) {
                            errorMsg = `Hata: ${error.error.message}`;
                        } else if (error.status) {
                            errorMsg = `Hata Kodu: ${error.status}\nMesaj: ${error.message}`;
                        }
                    }
                    this.messageService.add({
                        severity: 'error',
                        detail: errorMsg
                    });
            }
        })
    }


}
