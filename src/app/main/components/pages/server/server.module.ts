import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ServerComponent } from './server.component';
import { DataViewModule } from 'primeng/dataview';
import { ServerRoutingModule } from './server-routing.module';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
    imports: [
        CommonModule,
        DataViewModule,
        ServerRoutingModule,
        ButtonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        InputTextModule,
        FormsModule,
        InputNumberModule,
        ReactiveFormsModule,
        PasswordModule,
        ToggleButtonModule, 
    ],
    declarations: [ServerComponent],
})
export class ServerModule {}
