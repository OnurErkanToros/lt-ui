import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListenerSettingsComponent } from './listener-settings.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ListenerSettingsComponent }
	])],
	exports: [RouterModule]
})
export class ListenerSettingsRoutingModule { }
