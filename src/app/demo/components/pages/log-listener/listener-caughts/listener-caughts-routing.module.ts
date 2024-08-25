import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListenerCaughtsComponent } from './listener-caughts.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListenerCaughtsComponent }
	])],
	exports: [RouterModule]
})
export class ListenerCaughtsRoutingModule { }
