import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbuseKeyComponent } from './abuse-key.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: AbuseKeyComponent }]),
    ],
    exports: [RouterModule],
})
export class AbuseKeyRoutingModule {}
