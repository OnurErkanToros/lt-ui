import { NgModule } from '@angular/core';
import { AbuseBlacklistComponent } from './abuse-blacklist.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { AbuseBlacklistRoutingModule } from './abuse-blacklist-routing.module';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    imports: [
        AbuseBlacklistRoutingModule,
        CommonModule,
        TableModule,
        ToastModule,
        PaginatorModule,
        CardModule,
        ButtonModule,
        ProgressSpinnerModule
    ],
    declarations: [AbuseBlacklistComponent],
    providers:[MessageService]
})
export class AbuseBlacklistModule { }
