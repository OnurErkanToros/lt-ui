import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbuseBlacklistComponent } from './abuse-blacklist.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AbuseBlacklistComponent }
	])],
	exports: [RouterModule]
})
export class AbuseBlacklistRoutingModule { }
