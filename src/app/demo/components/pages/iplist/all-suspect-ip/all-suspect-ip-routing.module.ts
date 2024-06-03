import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllSuspectIpComponent } from './all-suspect-ip.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AllSuspectIpComponent }
	])],
	exports: [RouterModule]
})
export class AllSuspectIpRoutingModule { }
