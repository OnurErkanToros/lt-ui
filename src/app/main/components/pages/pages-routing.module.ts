import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'abuse/blacklist',
                loadChildren: () =>
                    import(
                        './abuse/abuse-blacklist/abuse-blacklist.module'
                    ).then((m) => m.AbuseBlacklistModule),
            },
            {
                path: 'abuse/check',
                loadChildren: () =>
                    import('./abuse/abuse-check/abuse-check.module').then(
                        (m) => m.AbuseCheckModule
                    ),
            },
            {
                path: 'abuse/key',
                loadChildren: () =>
                    import('./abuse/abuse-key/abuse-key.module').then(
                        (m) => m.AbuseKeyModule
                    ),
            },
            {
                path: 'server',
                loadChildren: () =>
                    import('./server/server.module').then(
                        (m) => m.ServerModule
                    ),
            },
            {
                path: 'log-listener/listener-settings',
                loadChildren: () =>
                    import(
                        './log-listener/listener-settings/listener-settings.module'
                    ).then((m) => m.ListenerSettingsModule),
            },
            {
                path: 'log-listener/listener-pattern',
                loadChildren: () =>
                    import(
                        './log-listener/listener-pattern/listener-pattern.module'
                    ).then((m) => m.ListenerPatternModule),
            },
            {
                path: 'log-listener/listener-caughts',
                loadChildren: () =>
                    import(
                        './log-listener/listener-caughts/listener-caughts.module'
                    ).then((m) => m.ListenerCaughtsModule),
            },
            {
                path: 'ban',
                loadChildren: () =>
                    import('./banned-ip/banned-ip.module').then(
                        (m) => m.BannedIpModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
