import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BanIpRequest, BannedIpResponse } from 'src/app/main/models/banned-ip';
import { BannedIpService } from 'src/app/main/service/banned-ip.service';

@Component({
    selector: 'app-banned-ip',
    templateUrl: './banned-ip.component.html',
    styleUrl: './banned-ip.component.scss',
})
export class BannedIpComponent implements OnInit {
    bannedIpList: BannedIpResponse[] = [];
    selectedBannedIpList: BannedIpResponse[] = [];
    visible = false;
    first = 0;
    size: number = 10;
    page: number = 0;
    rows = 1;
    totalRecords = 0;
    searchFormGroup: FormGroup;

    searchCriteria = {
        ip: '',
        ipType: '',
    };

    ipTypeOptions: any[] = [
        { name: 'LISTENER', value: 'LISTENER' },
        { name: 'BLACKLIST', value: 'BLACKLIST' },
        { name: 'CHECK', value: 'CHECK' },
    ];

    constructor(
        private bannedIpService: BannedIpService,
        private messageService: MessageService,
        private formBuilder: FormBuilder
    ) {
        this.searchFormGroup = formBuilder.group({
            ip: [''],
            ipType: [''],
        });
    }
    ngOnInit(): void {
        this.loadBannedIpList();
    }

    onPageChange(event) {
        this.first = event.first;
        this.page = event.page;
        this.size = event.rows;
        this.loadBannedIpList();
    }

    loadBannedIpList() {
        this.bannedIpService
            .getFiltered(this.page, this.size, this.searchCriteria)
            .subscribe({
                next: (data) => {
                    if (data) {
                        this.bannedIpList = data.content;
                        this.totalRecords = data.totalElements;
                        console.log(data);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Bir sorun var!',
                        });
                    }
                },
            });
    }
    searchFormSubmit() {
        this.searchCriteria.ip = this.searchFormGroup.get('ip').value;
        this.searchCriteria.ipType = this.searchFormGroup.get('ipType').value;

        this.loadBannedIpList();
    }

    setUnbanIPList() {
        let ipList: BanIpRequest[] = [];
        this.selectedBannedIpList.forEach((bannedIp) => {
            ipList.push({
                ip: bannedIp.ip,
                ipType: bannedIp.ipType,
            });
        });
        this.bannedIpService.unban(ipList).subscribe({
            next: (data) => {
                if (data) {
                    this.messageService.add({
                        severity: 'success',
                        detail: 'IP ban kaldırıldı.',
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        detail: 'IP ban kaldırılamadı.',
                    });
                }
            },
            complete: () => {
                this.loadBannedIpList();
                this.selectedBannedIpList = [];
            },
        });
    }

    syncDbAndFile() {
        this.bannedIpService.syncDBandFile().subscribe({
            next: (data) => {
                if (data) {
                    this.messageService.add({
                        severity: 'success',
                        detail: 'Eşitleme tamamlandı.',
                    });
                    this.loadBannedIpList();
                }
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    setUnbanSingleIp(bannedIp: BannedIpResponse) {
        this.selectedBannedIpList.push(bannedIp);
        this.setUnbanIPList();
    }
}
