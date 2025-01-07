import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../main/service/auth.service';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NoAuthGuardService {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/']); // Giriş yapmışsa ana sayfaya yönlendir
            return false; // `/auth` rotasına erişim engellenir
        }
        return true; // Giriş yapılmamışsa erişime izin ver
    }
}

export const NoAuthGuard: CanActivateFn = (route, state) => {
    return inject(NoAuthGuardService).canActivate();
};
