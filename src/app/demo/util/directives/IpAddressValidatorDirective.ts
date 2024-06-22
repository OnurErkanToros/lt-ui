import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { ipAddressValidator } from '../validator/Validator';

@Directive({
  selector: '[appIpAddress]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IpAddressValidatorDirective, multi: true }]
})
export class IpAddressValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return ipAddressValidator()(control);
  }
}
