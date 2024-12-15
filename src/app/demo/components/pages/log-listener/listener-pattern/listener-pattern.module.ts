import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListenerPatternComponent } from './listener-pattern.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListenerPatternRoutingModule } from './listener-pattern-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DataViewModule,
        ListenerPatternRoutingModule,
        ButtonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        InputTextModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [ListenerPatternComponent],
})
export class ListenerPatternModule {}
