import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListenerCaughtsComponent } from './listener-caughts.component';
import { ListenerCaughtsRoutingModule } from './listener-caughts-routing.module';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
    imports: [
        CommonModule,
        DataViewModule,
        ListenerCaughtsRoutingModule,
        ButtonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        InputTextModule,
        FormsModule,
        FieldsetModule,
        ReactiveFormsModule,
        SelectButtonModule,
    ],
    declarations: [ListenerCaughtsComponent],
})
export class ListenerCaughtsModule {}
