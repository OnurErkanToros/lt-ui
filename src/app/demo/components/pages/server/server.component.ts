import { MessageService } from 'primeng/api';
import { Component } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { ServerService } from 'src/app/demo/service/server.service';
import { ServerResponse } from 'src/app/demo/models/server';
import { DataResult } from 'src/app/demo/models/result';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
})
export class ServerComponent {
    products!: Product[];
    servers:ServerResponse[]=[];
    selectedServers:ServerResponse[]=[];
    loading=false;

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


}
