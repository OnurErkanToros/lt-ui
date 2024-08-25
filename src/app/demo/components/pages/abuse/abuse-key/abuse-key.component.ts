import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AbuseDbKeyRequest, AbuseDbKeyResponse } from 'src/app/demo/models/abuse';
import { DataResult } from 'src/app/demo/models/result';
import { AbuseKeyService } from 'src/app/demo/service/abuseKey.service';

@Component({
  selector: 'app-abuse-key',
  templateUrl: './abuse-key.component.html',
  styleUrl: './abuse-key.component.scss'
})
export class AbuseKeyComponent implements OnInit{
  abuseKeys: AbuseDbKeyResponse[] = [];
  loading = false;
  visible = false;
  abuseRequest: AbuseDbKeyRequest = {};
  constructor(private abuseKeyService: AbuseKeyService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.loadAbuseKeys();
  }
  loadAbuseKeys(){
    this.loading=true;
    this.abuseKeyService.getAllAbuseKey()
    .subscribe(
      {
        next:data=>{
          if(data.success){
            this.abuseKeys=data.data;
          }else{
            this.messageService.add(
              {
                detail:data.message,
                severity:'error'
              }
            )
          }
          this.loading=false;
        }
      }
    )
  }
  addNewAbuseKey(form:NgForm){
    if(form.valid){
      this.abuseKeyService.addAbuseKey(this.abuseRequest)
      .subscribe({
        next: data=>{
          if(data.success){
            this.messageService.add({
              severity:'success',
              detail:data.message
            });
            this.abuseRequest={}
            this.loadAbuseKeys();
            this.visible=false;
          }else{
            this.messageService.add({
              severity:'error',
              detail:data.message
            })
          }
        },
        error: error=>{
          this.messageService.add({
            severity:'error',
            detail:error
          })
        }
      })
    }
  }
}
