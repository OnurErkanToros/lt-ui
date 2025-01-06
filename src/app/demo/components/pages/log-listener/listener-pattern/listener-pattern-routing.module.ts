import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListenerPatternComponent } from './listener-pattern.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ListenerPatternComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ListenerPatternRoutingModule {}
