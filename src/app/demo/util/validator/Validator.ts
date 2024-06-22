import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ipAddressValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const ipAddressRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
        const isValid = ipAddressRegex.test(control.value);
        return isValid ? null : { invalidIpAddress: true };
    };
}
