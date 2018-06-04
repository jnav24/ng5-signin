import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @Output() animateTo: EventEmitter<String> = new EventEmitter();
    error: String = '';
    login: FormGroup;

    constructor(private fb: FormBuilder, private loginService: LoginService) { }

    ngOnInit() {
        this.login = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
        });

        this.isUserLoggedIn();
    }

    logUserIn() {
        this.loginService
            .loginUser(this.login.value.email, this.login.value.password)
            .then(auth => {
                auth.getIdToken().then(token => {
                    if (this.login.value.remember_me) {
                        this.loginService.setRememberMe(auth.uid);
                    }

                    this.loginService.saveToken(token, auth.uid);
                    this.loginService.redirectUser(auth);
                });
            })
            .catch(error => {
                this.error = error.message;
            });
    }

    animateToRegister() {
        this.animateTo.emit('register');
    }

    animateToResetPassword() {
        this.animateTo.emit('reset_password');
    }

    private isUserLoggedIn() {
        const auth = false;

        if (auth) {
            this.loginService.redirectUser(auth);
        }
    }
}
