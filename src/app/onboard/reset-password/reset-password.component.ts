import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    @Output() animateTo: EventEmitter<String> = new EventEmitter();
    password_reset: FormGroup;
    error: String = '';
    reset: Boolean = false;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.password_reset = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
        });
    }

    resetPassword() {}

    animateToLogin() {
        this.animateTo.emit('login');
    }
}
