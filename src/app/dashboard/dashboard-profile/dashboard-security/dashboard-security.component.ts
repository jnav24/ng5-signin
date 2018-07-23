import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {FlashMessageComponent} from '@app/dialogs/flash-message/flash-message.component';

@Component({
    selector: 'app-profile-security',
    templateUrl: './dashboard-security.component.html',
    styleUrls: ['./dashboard-security.component.scss']
})
export class DashboardSecurityComponent implements OnInit {
    securityForm: FormGroup;

    constructor(public dialog: MatDialog,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.securityForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
            newEmail: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
            newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
            confirmNewPassword: ['', [Validators.required, CustomValidator.passwordMatch()]]
        });
    }

    updateAuth() {
        this.dialog.open(FlashMessageComponent, {
            data: {
                promise: new Promise((resolve, reject) => {
                    if (this.securityForm.value.email === this.securityForm.value.newEmail &&
                        this.securityForm.value.password === this.securityForm.value.newPassword) {
                        // ...
                    }
                    reject('rejecting bitch');
                }),
                status: {
                    success: {
                        message: 'Your email and password were updated successfully'
                    },
                    error: {
                        message: 'Unable to update your email and password'
                    }
                }
            }
        });
    }

    disallowSave() {
        return !this.securityForm.valid;
    }
}

export class CustomValidator {
    static checkOptional() {
        return (control: AbstractControl) => {
            console.log(!control.root.value.newEmail);
            console.log(!control.root.value.newPassword);
            console.log('=================================');
            if (!control.root.value.newEmail && !control.root.value.newPassword) {
                return { validateConfirm: false };
            }

            return null;
        };
    }

    static checkEmail() {
        return (control: AbstractControl) => {
            if (control.value && /\S+@\S+\.\S+/.test(control.value)) {
                return { validateConfirm: false };
            }

            return null;
        };
    }

    static checkPassword() {
        return (control: AbstractControl) => {
            if (control.value && control.value.length >= 8 && control.value.length <= 24) {
                return { validateConfirm: false };
            }

            return null;
        };
    }

    static passwordMatch() {
        return (control: AbstractControl) => {
            if (control.value && control.value !== control.root.get('newPassword').value) {
                return { validateConfirm: false };
            }

            return null;
        };
    }
}
