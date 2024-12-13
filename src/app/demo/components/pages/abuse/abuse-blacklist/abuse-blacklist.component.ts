import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AbuseBlackListResponse } from 'src/app/demo/models/abuse';
import { AbuseService } from 'src/app/demo/service/abuse.service';
import { LoadingService } from 'src/app/demo/service/util/loading.service';
import { getCountryNameByCountryCode } from 'src/app/demo/util/country-util';
@Component({
    templateUrl: './abuse-blacklist.component.html',
    providers: [MessageService]
})
export class AbuseBlacklistComponent implements OnInit {
    blacklist: AbuseBlackListResponse[] = [];
    countBlacklistNewStatus = 0;
    first = 0;
    size: number = 10;
    page: number = 0;
    rows = 1;
    totalRecords = 0;
    loading$ = this.loadingService.loading$;
    constructor(private abuseService: AbuseService, private messageService: MessageService, private loadingService:LoadingService) { }

    ngOnInit() {
        this.loadData();
    }
    onPageChange(event) {
        this.first = event.first;
        this.page = event.page;
        this.size = event.rows;
        this.loadData();
    }
    loadData() {
        this.checkThereIsNewStatus();
        this.abuseService.getAllBlackList(this.page, this.size)
            .subscribe({
                next: (data) => {
                    if (data) {
                        this.blacklist = data.content;
                        this.totalRecords = data.totalElements;
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Bir sorun var.'
                        })
                    }
                },
            });
    }
    updateBlackList(event: MouseEvent) {
        this.abuseService.refreshBlackList()
            .subscribe({next:data => {
                if (data) {
                    this.loadData();
                } else {
                    this.messageService.add({ severity: 'error', detail: 'Bir sorun var.' })
                }
                
            },complete:()=>{
            }}
            )
            
    }

    checkThereIsNewStatus() {
        this.abuseService.getCountBlacklistStatusNew().subscribe({
            next: data => {
                if (data>0) {
                    this.countBlacklistNewStatus = data;
                    if (this.countBlacklistNewStatus > 0) {
                        this.messageService.add({
                            detail: 'Transfere hazılanmamış kayıtlar mevcut!',
                            severity: 'warn'
                        })
                    };
                }
            }
        })
    }

    prepareBlackListForBanning() {
        this.abuseService.prepareBlackListForBanning().subscribe({
            next: data => {
                if(data){
                    this.messageService.add({
                        severity:'success',
                        detail:'IP\'ler transfere hazırlandı.'
                    })
                }else{
                    this.messageService.add({
                        severity:'success',
                        detail:'IP\'ler transfere hazırlanamadı. Bir sorun oluştu.'
                    })
                }
            }
        })
    }

    getCountryNameByCountryCode(countryCode: string) {
        return getCountryNameByCountryCode(countryCode);
    }
}
