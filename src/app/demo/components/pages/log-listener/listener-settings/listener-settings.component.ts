import { DataResult } from './../../../../models/result';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LogListenerStatus } from 'src/app/demo/models/logListener';
import { LogListenerService } from 'src/app/demo/service/logListener.service';

@Component({
  selector: 'app-listener-settings',
  templateUrl: './listener-settings.component.html',
  providers:[MessageService]
})
export class ListenerSettingsComponent implements OnInit {
    checked: boolean = false;
    loading=false;
    constructor(private loglistenerService:LogListenerService,private messageService:MessageService){
    }
    ngOnInit(): void {
        this.loadChecked();
    }

    loadChecked(){
        this.loading=true;
        this.loglistenerService.status()
        .subscribe({
            next:(data)=>{
                console.log(data)
                if(data){
                    if(data.status==='STARTED'){
                        this.checked=true;
                    }else{
                        this.checked=false;
                    }
                }else{
                    this.messageService.add
                    ({detail:'Bir sorun oluştu!',severity:'error'});
                }
                this.loading=false;
            }
        }
        )
    }
    onChange(){
        if(!this.checked){
            this.stopListener();
        }else{
            this.startListener();
        }
    }
    startListener(){
        this.loading=true;
        this.loglistenerService.start()
        .subscribe({
            next:(data)=>{
                if(data){
                    this.checked=true;
                    this.messageService.add
                    ({detail:'Başarıyla başlatıldı.',severity:'success'});
                }else{
                    this.messageService.add
                    ({detail:'Bir sorun oluştu!',severity:'error'});
                }
                this.loading=false;
            }
        }
        )
    }
    stopListener(){
        this.loading=true;
        this.loglistenerService.stop()
        .subscribe({
            next:(data)=>{
                if(data){
                    this.checked=false;
                    this.messageService.add
                    ({detail:'Başarıyla durduruldu.',severity:'success'});
                }else{
                    this.messageService.add
                    ({detail:'Bir sorun oluştu!',severity:'error'});
                }
                this.loading=false;
            }
        }
        )
    }

}
