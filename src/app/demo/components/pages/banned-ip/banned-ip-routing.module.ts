import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BannedIpComponent } from "./banned-ip.component";

@NgModule({
    imports:[RouterModule.forChild([
        {path:'',component: BannedIpComponent},
    ])],
    exports:[RouterModule]
})
export class BannedIpRoutingModule{}