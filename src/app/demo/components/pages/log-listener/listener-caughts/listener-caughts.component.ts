import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { el, er } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { AbuseCheckResponse } from 'src/app/demo/models/abuse';
import { BanIpRequest } from 'src/app/demo/models/banned-ip';
import { Page } from 'src/app/demo/models/page';
import { DataResult } from 'src/app/demo/models/result';
import { SuspectIpResponse } from 'src/app/demo/models/suspectIp';
import { AbuseService } from 'src/app/demo/service/abuse.service';
import { SuspectIpService } from 'src/app/demo/service/suspect-ip.service';
import { getCountryNameByCountryCode } from 'src/app/demo/util/country-util';

@Component({
    selector: 'app-listener-caughts',
    templateUrl: './listener-caughts.component.html',
    providers: [MessageService],
})
export class ListenerCaughtsComponent implements OnInit {
    suspectIpList?: SuspectIpResponse[];
    selectedSuspectIpList: SuspectIpResponse[] = [];
    selectedSuspectIp: SuspectIpResponse = {};
    abuseCheckResponse: AbuseCheckResponse = {};
    banIpRequestList: BanIpRequest[] = [];
    loading = false;
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
        private formBuilder: FormBuilder
    ) {
        this.searchFormGroup = formBuilder.group({
            ip: [''],
            host: [''],
            status: [''],
        });
    }

    loadData() {
        this.loading = true;
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
                    this.loading = false;
                },
            });
    }
    setBanSuspectIp() {
        this.prepareBadRequestIpList();
        this.suspectIpService
            .setBanSuspectIps(this.banIpRequestList)
            .subscribe({
                next: (data) => {
                    if (data) {
                        this.messageService.add({
                            severity: 'success',
                            detail: 'Seçilenler banlandı.',
                        });
                        this.loadData();
                        this.selectedSuspectIpList = [];
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Bir sorun oluştu!',
                        });
                    }
                },
            });
    }

    setUnbanSuspectIp() {
        this.prepareBadRequestIpList();
        this.suspectIpService
            .setUnBanSuspectIps(this.banIpRequestList)
            .subscribe({
                next: (data) => {
                    this.messageService.add({
                        severity: 'success',
                        detail: 'Seçilenlerin banı kaldırıldı.',
                    });
                    this.loadData();
                    this.selectedSuspectIpList = [];
                },
            });
    }

    prepareBadRequestIpList() {
        this.selectedSuspectIpList.forEach((element) => {
            this.banIpRequestList.push({ ip: element.ip });
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

    getSelectedIpListType(): string {
        if (
            this.selectedSuspectIpList.some(
                (selected) => selected.status === 'BANNED'
            )
        ) {
            console.log('banned');
            return 'BANNED';
        } else if (
            this.selectedSuspectIpList.some(
                (selected) => selected.status === 'NEW'
            ) ||
            this.selectedSuspectIpList.some(
                (selected) => selected.status === 'CANCEL_BAN'
            )
        ) {
            console.log('new');
            return 'NEW';
        } else {
            return '';
        }
    }
}
