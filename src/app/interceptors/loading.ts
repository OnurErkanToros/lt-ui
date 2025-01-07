import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { LoadingService } from '../main/service/util/loading.service';

@Injectable({
    providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.loadingService.show();
        return next.handle(req).pipe(
            catchError((error) => {
                this.loadingService.hide();
                return throwError(() => error);
            }),
            finalize(() => {
                this.loadingService.hide();
            })
        );
    }
}
