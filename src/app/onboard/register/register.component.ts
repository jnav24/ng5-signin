import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from './register.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    @Output() animateTo: EventEmitter<String> = new EventEmitter();
    error: String = '';
    signup: FormGroup;

    constructor(private fb: FormBuilder, private registerService: RegisterService) { }

    ngOnInit() {
        this.signup = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(3)]],
            last_name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
            confirm_password: ['', [Validators.required]],
        });
    }

    registerUser() {
        return this.registerService.createNewUser();
    }

    animateToLogin() {
        this.animateTo.emit('login');
    }
}
