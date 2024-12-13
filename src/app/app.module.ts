import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy, registerLocaleData, CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { DataViewModule } from 'primeng/dataview';
import { MessageService } from 'primeng/api';
import localeTr from '@angular/common/locales/tr';
import { LOCALE_ID } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error';
import { ToastModule } from 'primeng/toast';
import { LoadingInterceptor } from './interceptors/loading';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
registerLocaleData(localeTr);

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule,ToastModule,ProgressSpinnerModule,CommonModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        DataViewModule,
        MessageService,
        { provide: LOCALE_ID, useValue: 'tr-TR' },
        {provide:HTTP_INTERCEPTORS,useClass:HttpErrorInterceptor,multi:true},
        {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
