import { Page } from './../../../../models/page';
import { TablePageEvent } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AbuseBlackListResponse } from 'src/app/demo/models/abuse';
import { AbuseService } from 'src/app/demo/service/abuse.service';
import { countries } from 'src/app/demo/api/countries';

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
        this.abuseService.getAllBlackList(this.page,this.size)
        .subscribe(data=>{
            if(data.success){
                this.blacklist=data.data.content;
                this.totalRecords=data.data.totalElements;
            }else{
                this.messageService.add({severity:'error',detail:data.message});
            }
        });
    }
    updateBlackList(event:MouseEvent){
        this.abuseService.refreshBlackList()
        .subscribe(data=>{
            if(data.success){
                this.loadData();
                this.messageService.add({severity:"success",detail:data.message})
            }else{
                this.messageService.add({severity:'error',detail:data.message})
            }
        }
        )
    }
    getCountryNameByCountryCode(countryCode: string) {
        const country = countries.find(c => c.countryCode === countryCode);
        if (country === undefined) {
            return countryCode;
        } else {
            return country.countryName || countryCode;
        }
    }
}
