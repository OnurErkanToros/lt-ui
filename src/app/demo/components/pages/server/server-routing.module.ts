import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerComponent } from './server.component';



@NgModule({
  imports: [RouterModule.forChild([
    {path:'',component:ServerComponent}
  ])],
  exports:[RouterModule]
})
export class ServerRoutingModule { }
