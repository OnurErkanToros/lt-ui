import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AbuseBlacklistComponent } from './abuse-blacklist.component';
import { MessagesModule } from 'primeng/messages';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AbuseBlacklistComponent }
	])],
	exports: [RouterModule],
    providers:[MessagesModule]
})
export class AbuseBlacklistRoutingModule { }
