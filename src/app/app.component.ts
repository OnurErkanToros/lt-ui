import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoadingService } from './main/service/util/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    loading$ = this.loadingService.loading$;
    constructor(
        private primengConfig: PrimeNGConfig,
        private loadingService: LoadingService
    ) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
