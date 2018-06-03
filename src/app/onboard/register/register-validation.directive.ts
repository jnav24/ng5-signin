import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[appRegisterValidation][formControlName],[appRegisterValidation][formControl]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => RegisterValidationDirective),
            multi: true
        }
    ]
})
export class RegisterValidationDirective implements Validator {
    constructor() { }

    validate(c: AbstractControl): { [key: string]: any } {
        if (c.get('password') !== null ) {
            if (c.value.password !== c.value.confirm_password) {
                return { validateConfirm: false };
            }
        }

        return null;
    }
}
