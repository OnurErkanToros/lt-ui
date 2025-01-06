import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbuseCheckComponent } from './abuse-check.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: AbuseCheckComponent }]),
    ],
    exports: [RouterModule],
})
export class AbuseCheckRoutingModule {}
