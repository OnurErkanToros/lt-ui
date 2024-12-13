import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../demo/service/auth.service";

@Injectable({
    providedIn:'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private messageService:MessageService,private authService:AuthService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status==403){
                    this.authService.logout();
                    this.authService.getHeaders(); 
                    return throwError(() => errorMessage);
                }
                console.log('interceptor içine girdi!')
                console.log(error)
                let errorMessage = 'Bilinmeyen bir hata oluştu.';    
                if(error.error){
                    errorMessage=error.error.message;
                }
                this.messageService.add({severity:'error',detail:errorMessage})
                return throwError(() => errorMessage);
              })
        )
    }
}
