import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ServerComponent } from "./server.component";
import { DataViewModule } from 'primeng/dataview';
import { ServerRoutingModule } from './server-routing.module';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';


@NgModule({
    imports:[CommonModule,DataViewModule,ServerRoutingModule,ButtonModule,ToastModule,ToolbarModule,TableModule],
    declarations:[ServerComponent]
})
export class ServerModule{}
