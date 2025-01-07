import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../main/service/auth.service';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class PermissionService {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            return true; // Giriş yapılmışsa erişime izin ver
        } else {
            this.router.navigate(['/auth']); // Giriş yapılmamışsa `/auth` rotasına yönlendir
            return false;
        }
    }
}

export const AuthGuard: CanActivateFn = (route, state) => {
    return inject(PermissionService).canActivate();
};
