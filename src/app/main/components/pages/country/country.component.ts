import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { CountryResponse } from 'src/app/main/models/country';
import { CountryService } from 'src/app/main/service/country.service';

@Component({
    selector: 'app-server',
    templateUrl: './country.component.html',
})
export class CountryComponent implements OnInit {
    allowCountries: CountryResponse[] = [];
    denyCountries: CountryResponse[] = [];

    constructor(
        private messageService: MessageService,
        private countryService: CountryService
    ) {}

    ngOnInit(): void {
        this.countryService.getCountries().subscribe((data) => {
            this.allowCountries = data.filter((x) => x.allowed == true);
            this.denyCountries = data.filter((x) => x.allowed == false);
        });
    }

    moveAllToTarget($event: any) {
        this.countryService
            .setAllowIDs($event.items.map((x) => x.id))
            .subscribe((data) => {});
    }
    moveAllToSource($event: any) {
        this.countryService
            .setDenyIDs($event.items.map((x) => x.id))
            .subscribe((data) => {});
    }
    moveToTarget($event: any) {
        this.countryService
            .setAllowIDs($event.items.map((x) => x.id))
            .subscribe((data) => {});
    }
    moveToSource($event: any) {
        this.countryService
            .setDenyIDs($event.items.map((x) => x.id))
            .subscribe((data) => {});
    }
}
