import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CountryComponent } from './country.component';


@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: CountryComponent }]),
    ],
    exports: [RouterModule],
})
export class CountryRoutingModule {}
