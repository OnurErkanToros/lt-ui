import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AbuseCheckResponse } from 'src/app/demo/models/abuse';
import { DataResult } from 'src/app/demo/models/result';
import { AbuseService } from 'src/app/demo/service/abuse.service';

@Component({
    templateUrl: './abuse-check.component.html',
    styleUrls: ['./abuse-check.style.css'],
    providers: [MessageService],
})
export class AbuseCheckComponent {
    ipAddress: string = '';
    loading: boolean = false;
    abuseCheckResponse: AbuseCheckResponse;
    constructor(
        private messageService: MessageService,
        private abuseService: AbuseService
    ) {}

    checkIpAddress(event: MouseEvent) {
        if (this.validateIPAddress()) {
            this.loading = true;

            this.abuseService
                .checkIp({ ipAddress: this.ipAddress, maxAgeInDays: 90 })
                .subscribe({
                    next: (data: DataResult<AbuseCheckResponse>) => {
                        if (data.success) {
                            this.abuseCheckResponse = data.data;
                            console.log(data)
                        } else {
                            if (data.message) {
                                this.messageService.add({
                                    severity: 'error',
                                    detail: data.message,
                                });
                            } else {
                                this.messageService.add({
                                    severity: 'error',
                                    detail: 'Sorgulama başarısız bir sorun var.',
                                });
                            }
                        }
                        this.loading = false;
                    },
                    error: (error) => {
                        this.loading = false;
                        this.messageService.add({
                            severity: 'error',
                            detail: error,
                        });
                    },
                });
        } else {
            this.messageService.add({
                severity: 'warn',
                detail: 'Lütfen geçerli bir IP adresi girin!',
            });
        }
    }
    validateIPAddress(): boolean {
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
}
