import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { DataViewModule } from 'primeng/dataview';
import { MessageService } from 'primeng/api';
import localeTr from '@angular/common/locales/tr';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(localeTr);

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        DataViewModule,
        MessageService,
        { provide: LOCALE_ID, useValue: 'tr-TR' }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
