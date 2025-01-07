import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListenerSettingsComponent } from './listener-settings.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ListenerSettingsRoutingModule } from './listener-settings-routing.module';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';

@NgModule({
    imports: [
        CommonModule,
        DataViewModule,
        ListenerSettingsRoutingModule,
        ButtonModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        InputTextModule,
        FormsModule,
        CardModule,
        DropdownModule,
        DividerModule,
    ],
    declarations: [ListenerSettingsComponent],
})
export class ListenerSettingsModule {}
