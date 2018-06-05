import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {User} from '@app/common/models/users.model';
import {UsersService} from '@app/common/services/users.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    @Output() animateTo: EventEmitter<String> = new EventEmitter();
    error: String = '';
    signup: FormGroup;

    constructor(private fb: FormBuilder,
                private registerService: RegisterService,
                private usersService: UsersService) { }

    ngOnInit() {
        this.signup = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(3)]],
            last_name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
            confirm_password: ['', [Validators.required]],
        });
    }

    async registerUser() {
        try {
            const response = await this.registerService.createNewUser(this.signup.value.email, this.signup.value.password);

            response
                .getIdToken()
                .then(token => {
                    const user: User = {
                        email: this.signup.value.email,
                        first_name: this.signup.value.first_name,
                        last_name: this.signup.value.last_name,
                        active: true,
                        token: token,
                    };

                    this.usersService
                        .addUser(user, response.uid)
                        .catch(error => {
                            console.error(error);
                        });
                })
                .catch(error => {
                    console.error(error);
                    throw error;
                });
        } catch (err) {
            // create a log
            if (err.code === 'auth/email-already-in-use') {
                this.error = 'You already have an account. Did you forget your password?';
            } else {
                this.error = 'An unexpected error has occurred. Please try again.';
            }
        }
    }

    animateToLogin() {
        this.animateTo.emit('login');
    }
}
