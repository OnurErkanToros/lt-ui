import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AbuseCheckResponse } from 'src/app/demo/models/abuse';
import { AbuseService } from 'src/app/demo/service/abuse.service';
import { LoadingService } from 'src/app/demo/service/util/loading.service';
import { getCountryNameByCountryCode } from 'src/app/demo/util/country-util';

@Component({
    templateUrl: './abuse-check.component.html',
    providers: [MessageService],
})
export class AbuseCheckComponent {
    ipAddress: string = '';
    loading$ = this.loadingService.loading$;
    abuseCheckResponse: AbuseCheckResponse = {};
    visible=false;
    constructor(
        private messageService: MessageService,
        private abuseService: AbuseService,
        private loadingService:LoadingService
    ) {}

    checkIpAddress(event: MouseEvent) {
        if (this.validateIPAddress()) {
            this.abuseService
                .checkIp({ ipAddress: this.ipAddress, maxAgeInDays: 200 })
                .subscribe({
                    next: (data) => {
                        if (data) {
                            this.abuseCheckResponse = data;
                            this.visible=true;
                        } else {
                        
                                this.messageService.add({
                                    severity: 'error',
                                    detail: 'Sorgulama başarısız.'
                                });
                            
                        }
                    }
                });
        } else {
            this.messageService.add({
                severity: 'warn',
                detail: 'Lütfen geçerli bir IP adresi girin!',
            });
        }
    }

    prepareCheckIpForBan(ip:string){
        this.abuseService.prepareCheckIpForBanning({ip:ip}).subscribe(
            {
                next:data=>{
                    if(data){
                        this.messageService.add({
                            detail:'Banlanacaklar listesine eklendi.',
                            severity:'success'
                        })
                    }else{
                        this.messageService.add({
                            detail:'Banlanacaklar listesine eklenemedi.',
                            severity:'error'
                        })
                    };
                }
            }
        );
        this.visible=false;
    }
    private validateIPAddress(): boolean {
        const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
        if (!ipPattern.test(this.ipAddress)) {
            return false;
        }
        const ipParts = this.ipAddress.split('.');
        for (const part of ipParts) {
            const num = parseInt(part, 10);
            if (isNaN(num) || num < 0 || num > 255) {
                return false;
            }
        }
        return true;
    }
    getCountryNameByCountryCode(countryCode: string) {
        return getCountryNameByCountryCode(countryCode);
    }
}
