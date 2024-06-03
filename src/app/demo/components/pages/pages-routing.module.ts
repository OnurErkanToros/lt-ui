import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'abuse/blacklist', loadChildren: () => import('./abuse/abuse-blacklist/abuse-blacklist.module').then(m => m.AbuseBlacklistModule) },
        { path: 'abuse/check', loadChildren: () => import('./abuse/abuse-check/abuse-check.module').then(m => m.AbuseCheckModule) },
        { path: 'iplist/all-suspect', loadChildren: () => import('./iplist/all-suspect-ip/all-suspect-ip.module').then(m => m.AllSuspectIpModule) },
        { path: 'server', loadChildren: () => import('./server/server.module').then(m => m.ServerModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
