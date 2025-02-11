import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
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
import { CountryComponent } from './country.component';
import { CountryRoutingModule } from './country-routing.module';
import { CardModule } from 'primeng/card';
import { PickListModule } from 'primeng/picklist';


@NgModule({
    imports: [
        CommonModule,
        DataViewModule,
        CountryRoutingModule,
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
        CardModule,
        PickListModule
    ],
    declarations: [CountryComponent],
})
export class CountryModule {}
