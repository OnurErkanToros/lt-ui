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
            next:(data:DataResult<LogListenerStatus>)=>{
                console.log(data)
                if(data.success){
                    if(data.data.status==='STARTED'){
                        this.checked=true;
                    }else{
                        this.checked=false;
                    }
                }else{
                    this.messageService.add
                    ({detail:data.message,severity:'error'});
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
            next:(data:DataResult<string>)=>{
                if(data.success){
                    this.checked=true;
                    this.messageService.add
                    ({detail:data.message,severity:'success'});
                }else{
                    this.messageService.add
                    ({detail:data.message,severity:'error'});
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
        }
        )
    }
    stopListener(){
        this.loading=true;
        this.loglistenerService.stop()
        .subscribe({
            next:(data:DataResult<string>)=>{
                if(data.success){
                    this.checked=false;
                    this.messageService.add
                    ({detail:data.message,severity:'success'});
                }else{
                    this.messageService.add
                    ({detail:data.message,severity:'error'});
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
        }
        )
    }

}
