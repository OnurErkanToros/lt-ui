import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AbuseCheckResponse } from 'src/app/main/models/abuse';
import { AbuseService } from 'src/app/main/service/abuse.service';
import { BannedIpService } from 'src/app/main/service/banned-ip.service';
import { getCountryNameByCountryCode } from 'src/app/main/util/country-util';

@Component({
    templateUrl: './abuse-check.component.html',
    providers: [MessageService],
})
export class AbuseCheckComponent {
    ipAddress: string = '';
    abuseCheckResponse: AbuseCheckResponse = {};
    visible = false;
    constructor(
        private messageService: MessageService,
        private abuseService: AbuseService,
        private banService: BannedIpService
    ) {}

    checkIpAddress(event: MouseEvent) {
        if (this.validateIPAddress()) {
            this.abuseService
                .checkIp({ ipAddress: this.ipAddress, maxAgeInDays: 200 })
                .subscribe({
                    next: (data) => {
                        if (data) {
                            this.abuseCheckResponse = data;
                            this.visible = true;
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                detail: 'Sorgulama başarısız.',
                            });
                        }
                    },
                });
        } else {
            this.messageService.add({
                severity: 'warn',
                detail: 'Lütfen geçerli bir IP adresi girin!',
            });
        }
    }

    banCheckIp(ip: string) {
        this.banService.ban([{ ip: ip, ipType: 'CHECK' }]).subscribe({
            next: (data) => {
                if (data[0].success) {
                    this.messageService.add({
                        severity: 'success',
                        detail: 'IP banlandı.',
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'IP banlanamadı.' + data[0].message,
                    });
                }
            },
        });
        this.visible = false;
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
