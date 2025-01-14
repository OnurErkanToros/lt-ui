import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AbuseCheckResponse } from 'src/app/main/models/abuse';
import { BanIpRequest } from 'src/app/main/models/banned-ip';
import { SuspectIpResponse } from 'src/app/main/models/suspectIp';
import { AbuseService } from 'src/app/main/service/abuse.service';
import { BannedIpService } from 'src/app/main/service/banned-ip.service';
import { SuspectIpService } from 'src/app/main/service/suspect-ip.service';
import { getCountryNameByCountryCode } from 'src/app/main/util/country-util';

@Component({
    selector: 'app-listener-caughts',
    templateUrl: './listener-caughts.component.html',
})
export class ListenerCaughtsComponent implements OnInit {
    suspectIpList?: SuspectIpResponse[];
    selectedSuspectIpList: SuspectIpResponse[] = [];
    selectedSuspectIp: SuspectIpResponse = {};
    abuseCheckResponse: AbuseCheckResponse = {};
    banIpRequestList: BanIpRequest[] = [];
    visibleDetail = false;
    visibleAbuseDetail = false;
    first = 0;
    size: number = 10;
    page: number = 0;
    rows = 1;
    totalRecords = 0;
    searchFormGroup: FormGroup;

    searchCriteria: {
        ipAddress: string;
        host: string;
        status: string;
    } = {
        ipAddress: '',
        host: '',
        status: '',
    };

    statusOptions: any[] = [
        { name: 'BANLANMIŞ', value: 'BANNED' },
        { name: 'BANLANMAMIŞ', value: 'NEW' },
        { name: 'BANI KALDIRILMIŞ', value: 'CANCEL_BAN' },
    ];

    ngOnInit(): void {
        this.loadData();
    }
    onPageChange(event) {
        this.first = event.first;
        this.page = event.page;
        this.size = event.rows;
        this.loadData();
    }
    constructor(
        private suspectIpService: SuspectIpService,
        private messageService: MessageService,
        private abuseService: AbuseService,
        private formBuilder: FormBuilder,
        private banService: BannedIpService
    ) {
        this.searchFormGroup = formBuilder.group({
            ip: [''],
            host: [''],
            status: [''],
        });
    }

    loadData() {
        this.suspectIpService
            .getFiltered(this.page, this.size, this.searchCriteria)
            .subscribe({
                next: (data) => {
                    if (data) {
                        this.suspectIpList = data.content;
                        this.totalRecords = data.totalElements;
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Bir sorun oluştu!',
                        });
                    }
                },
            });
    }
    setBanSuspectIp() {
        this.prepareBadRequestIpList();
        this.banService.ban(this.banIpRequestList).subscribe({
            next: (data) => {
                if (data) {
                    data.forEach((element) => {
                        if (element.success) {
                            this.messageService.add({
                                severity: 'success',
                                detail: element.message,
                            });
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                detail: element.message,
                            });
                        }
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'Bir sorun oluştu!',
                    });
                }
            },
            complete: () => {
                this.loadData();
                this.banIpRequestList = [];
                this.selectedSuspectIpList = [];
            },
        });
    }

    prepareBadRequestIpList() {
        this.selectedSuspectIpList.forEach((element) => {
            if (element.status !== 'BANNED') {
                this.banIpRequestList.push({
                    ip: element.ip,
                    ipType: 'LISTENER',
                });
            }
        });
    }

    showLineDetailDialog(selectedSuspectIp: SuspectIpResponse) {
        this.selectedSuspectIp = selectedSuspectIp;
        this.visibleDetail = true;
    }
    getCountryNameByCountryCode(countryCode: string) {
        return getCountryNameByCountryCode(countryCode);
    }

    checkIpAddress(ip: string) {
        this.abuseService
            .checkIp({ ipAddress: ip, maxAgeInDays: 200 })
            .subscribe({
                next: (data) => {
                    if (data) {
                        this.abuseCheckResponse = data;
                        this.visibleAbuseDetail = true;
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Sorgulama başarısız.',
                        });
                    }
                },
            });
    }

    searchSubmit() {
        this.searchCriteria.ipAddress = this.searchFormGroup.get('ip').value;
        this.searchCriteria.host = this.searchFormGroup.get('host').value;
        this.searchCriteria.status = this.searchFormGroup.get('status').value;
        this.loadData();
    }

    isRowSelectable(suspect: any): boolean {
        console.log(suspect);
        return suspect.status === 'NEW' || suspect.status === 'CANCEL_BAN';
    }
}
