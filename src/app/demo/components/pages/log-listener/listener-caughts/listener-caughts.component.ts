import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { Page } from 'src/app/demo/models/page';
import { DataResult } from 'src/app/demo/models/result';
import { ServerResponse, ServerRequest } from 'src/app/demo/models/server';
import { SuspectIpResponse } from 'src/app/demo/models/suspectIp';
import { SuspectIpService } from 'src/app/demo/service/suspect-ip.service';

@Component({
  selector: 'app-listener-caughts',
  templateUrl: './listener-caughts.component.html',
  providers: [MessageService]
})
export class ListenerCaughtsComponent implements OnInit {
    suspectIpList!: SuspectIpResponse[];
    selectedSuspectIp:SuspectIpResponse[]=[];
    loading=false;
    visible=false;
    first=0;
    size:number=10;
    page:number=0;
    rows=1;
    totalRecords=0;

    ngOnInit(): void {
        this.loadData();
    }
    onPageChange(event){
        this.first=event.first;
        this.page=event.page;
        this.size=event.rows;
        this.loadData();
    }
    constructor(private suspectIpService:SuspectIpService,private messageService:MessageService){}

    loadData(){
        this.loading=true;
        this.suspectIpService.getAll(this.page,this.size)
        .subscribe({
            next:(data:DataResult<Page<SuspectIpResponse>>)=>{
                if(data.success){
                    this.suspectIpList=data.data.content;
                    this.totalRecords= data.data.totalElements;
                }else{
                    this.messageService.add({
                        severity:'error',
                        detail:data.message
                    }
                    )
                }
                this.loading=false;
            },
            error :(error)=>{
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
                this.loading=false;
            }
        })
    }


}
