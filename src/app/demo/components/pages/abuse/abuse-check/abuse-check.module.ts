import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AbuseCheckComponent } from './abuse-check.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AbuseCheckRoutingModule } from './abuse-check-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
    imports: [
        AbuseCheckRoutingModule,
        CommonModule,
        FormsModule,
        CardModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        ProgressSpinnerModule
    ],
    declarations: [AbuseCheckComponent],
    providers:[MessageService]
})
export class AbuseCheckModule { }
