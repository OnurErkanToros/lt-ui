import { Page } from './../../../../models/page';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AbuseBlackListResponse } from 'src/app/demo/models/abuse';
import { AbuseService } from 'src/app/demo/service/abuse.service';
import { getCountryNameByCountryCode } from 'src/app/demo/util/country-util';
import { DataResult } from 'src/app/demo/models/result';
@Component({
    templateUrl: './abuse-blacklist.component.html',
    providers: [MessageService]
})
export class AbuseBlacklistComponent implements OnInit {
    blacklist : AbuseBlackListResponse[]=[];
    selectedBlackList :AbuseBlackListResponse[]=[];
    first=0;
    size:number=10;
    page:number=0;
    rows=1;
    totalRecords=0;
    loading=false;
    constructor(private abuseService: AbuseService, private messageService: MessageService) { }

    ngOnInit() {
        this.loadData();
    }
    onPageChange(event) {
        this.first=event.first;
        this.page = event.page;
        this.size = event.rows;
        this.loadData();
    }
    selectionChange(event){
        console.log(this.selectedBlackList)
    }
    loadData(){
        this.loading=true;
        this.abuseService.getAllBlackList(this.page,this.size)
        .subscribe({
            next:(data:DataResult<Page<AbuseBlackListResponse>>) => {
                if(data.success){
                    this.blacklist=data.data.content;
                    this.totalRecords=data.data.totalElements;
                }else{
                    this.messageService.add({
                        severity:'error',
                        detail:data.message
                    })
                }
                this.loading=false;
            },
            error:(error)=>{
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
        });
    }
    updateBlackList(event:MouseEvent){
        this.loading=true;
        this.abuseService.refreshBlackList()
        .subscribe(data=>{
            if(data.success){
                this.loadData();
                this.messageService.add({severity:"success",detail:data.message})
            }else{
                this.messageService.add({severity:'error',detail:data.message})
            }
            this.loading=false;
        }
        )
    }
    getCountryNameByCountryCode(countryCode: string) {
        return getCountryNameByCountryCode(countryCode);
    }
}
