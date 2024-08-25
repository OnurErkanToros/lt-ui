import { NgModule } from "@angular/core";
import { AbuseKeyComponent } from "./abuse-key.component";
import { MessageService } from "primeng/api";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ToastModule } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";

@NgModule({
    imports:[
        FormsModule,
        CardModule,
        ButtonModule,
        ToastModule,
        InputTextModule,
        ProgressSpinnerModule,
        DialogModule,
        TableModule,
        ToolbarModule
    ],
    declarations:[AbuseKeyComponent],
    providers:[MessageService]
})
export class AbuseKeyModule{}