import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Anasayfa',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },


                        {
                label: 'Ip Kontrol',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Abuse',
                        icon: 'pi pi-fw pi-ban',
                        items:[
                            {
                                label: 'Karaliste',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/pages/abuse/blacklist']
                            },
                            {
                                label: 'Sorgulama',
                                icon: 'pi pi-fw pi-search',
                                routerLink: ['/pages/abuse/check']
                            }
                        ]
                    },
                    {
                        label: 'Log Dinleyici',
                        icon: 'pi pi-fw pi-eye',
                        items:[
                            {
                                label: 'Yakalananlar',
                                icon: 'pi pi-fw pi-ban',
                                routerLink: ['/pages/loglistener/caught']
                            }
                        ]
                    },
                    {
                        label:'Sunucu',
                        icon:'pi pi-fw pi-server',
                        routerLink:['/pages/server']
                    }
                ]
            }
        ];
    }
}
