import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/main/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    formGroup: FormGroup;

    constructor(
        public layoutService: LayoutService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.formGroup = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    formSubmit() {
        this.authService
            .login({
                username: this.formGroup.get('username').value,
                password: this.formGroup.get('password').value,
            })
            .subscribe({
                next: (isSuccess) => {
                    if (isSuccess) {
                        this.router.navigate(['/']);
                    }
                },
                error: (err) => {
                    console.error('Login failed', err);
                },
            });
    }
}
