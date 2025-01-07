import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../main/service/auth.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private router: Router
    ) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'Bilinmeyen bir hata oluştu.';
                if (error.status === 403) {
                    this.authService.logout();
                    this.router.navigate(['/auth']);
                }
                console.log('interceptor içine girdi!');
                console.log(error);
                if (error.message) {
                    errorMessage = error.error.message;
                }
                this.messageService.add({
                    severity: 'error',
                    detail: errorMessage,
                });
                return throwError(() => errorMessage);
            })
        );
    }
}
