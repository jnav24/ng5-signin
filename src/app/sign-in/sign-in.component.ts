import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    error: String = '';
    log_in: FormGroup;
    sign_up: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.log_in = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
            password: ['', [Validators.required]],
        });

        this.sign_up = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(3)]],
            last_name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
            confirm_password: ['', [Validators.required]],
        });
    }
}
