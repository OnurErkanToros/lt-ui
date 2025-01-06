import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BannedIpComponent } from './banned-ip.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { BannedIpRoutingModule } from './banned-ip-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        ButtonModule,
        PaginatorModule,
        ProgressSpinnerModule,
        CardModule,
        BannedIpRoutingModule,
        InputTextModule,
        SelectButtonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [BannedIpComponent],
})
export class BannedIpModule {}
