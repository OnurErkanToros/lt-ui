import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BannedIpResponse } from 'src/app/demo/models/banned-ip';
import { BannedIpService } from 'src/app/demo/service/banned-ip.service';
import { LoadingService } from 'src/app/demo/service/util/loading.service';

@Component({
    selector: 'app-banned-ip',
    templateUrl: './banned-ip.component.html',
    styleUrl: './banned-ip.component.scss',
})
export class BannedIpComponent implements OnInit {
    bannedIpList: BannedIpResponse[] = [];
    selectedBannedIpList: BannedIpResponse[] = [];
    loading$ = this.loadingService.loading$;
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
        private loadingService: LoadingService,
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
}
