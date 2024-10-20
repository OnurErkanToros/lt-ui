import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BannedIpResponse } from 'src/app/demo/models/banned-ip';
import { BannedIpService } from 'src/app/demo/service/banned-ip.service';

@Component({
  selector: 'app-banned-ip',
  templateUrl: './banned-ip.component.html',
  styleUrl: './banned-ip.component.scss'
})
export class BannedIpComponent implements OnInit {
  bannedIpList:BannedIpResponse[]=[];
  selectedBannedIpList:BannedIpResponse[]=[];
  loading=false;
  visible=false;
  first=0;
  size:number=10;
  page:number=0;
  rows=1;
  totalRecords=0;

  constructor(
    private bannedIpService:BannedIpService,
    private messageService:MessageService
  ){}

  ngOnInit(): void {
    this.loadBannedIpList();
  }

  onPageChange(event) {
    this.first=event.first;
    this.page = event.page;
    this.size = event.rows;
    this.loadBannedIpList();
}

  loadBannedIpList(){
    this.loading=true;
    this.bannedIpService.getAll(this.page,this.size)
    .subscribe({
      next:(data)=>{
        if(data.success){
          this.bannedIpList=data.data.content;
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
        this.messageService.add({
          severity: 'error',
          detail: error
      });
       this.loading=false;
      }
    })
  }


}
