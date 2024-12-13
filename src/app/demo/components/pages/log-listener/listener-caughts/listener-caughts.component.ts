import { Component, OnInit } from '@angular/core';
import { er } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { BanIpRequest } from 'src/app/demo/models/banned-ip';
import { Page } from 'src/app/demo/models/page';
import { DataResult } from 'src/app/demo/models/result';
import { SuspectIpResponse } from 'src/app/demo/models/suspectIp';
import { SuspectIpService } from 'src/app/demo/service/suspect-ip.service';

@Component({
  selector: 'app-listener-caughts',
  templateUrl: './listener-caughts.component.html',
  providers: [MessageService]
})
export class ListenerCaughtsComponent implements OnInit {
    suspectIpList?: SuspectIpResponse[];
    selectedSuspectIp:SuspectIpResponse[]=[];
    selectedLine?:string;
    banIpRequestList:BanIpRequest[]=[];
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
            next:(data)=>{
                if(data){
                    this.suspectIpList=data.content;
                    this.totalRecords= data.totalElements;
                }else{
                    this.messageService.add({
                        severity:'error',
                        detail:'Bir sorun oluştu!'
                    }
                    )
                }
                this.loading=false;
            }
        })
    }
    prepareSuspectIpForBan(){
        this.prepareBadRequestIpList();
        this.suspectIpService.prepareSuspectIpForBan(this.banIpRequestList).subscribe({
            next:data=>{
                if(data){
                    this.messageService.add({
                        severity:'success',
                        detail:'Seçilenler transfere hazırlandı.'
                    })
                }else{
                    this.messageService.add({
                        severity:'error',
                        detail:'Bir sorun oluştu!'
                    })
                }
            }
        });
    }
    
    prepareBadRequestIpList(){
        this.selectedSuspectIp.forEach(element => {
            this.banIpRequestList.push({ip:element.ip});
        });
    }

    showLineDetailDialog(line:string){
        this.selectedLine=line;
        this.visible=true;
    }
}
