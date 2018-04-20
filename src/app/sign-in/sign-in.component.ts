import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {SignInService} from '@app/sign-in/sign-in.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    animations: [
        trigger('animateSwitchForm', [
            state('switch-start', style({
                backgroundColor: '#fff',
                opacity: 1,
                top: '50px',
                zIndex: 1
            })),
            state('switch-finish', style({
                backgroundColor: '#000',
            })),
            transition('switch-start => switch-finish', [
                animate( 500, style({
                    backgroundColor: '#cfc',
                    opacity: 0,
                    top: '-999px',
                    zIndex: 1
                }))
            ])
        ]),
        trigger('animateFadeForm', [
            state('fade-start', style({
                opacity: 0
            })),
            state('fade-finish', style({
                opacity: 1
            })),
            transition('fade-start => fade-finish', animate(500))
        ])
    ]
})
export class SignInComponent implements OnInit {
    error: String = '';
    log_in: FormGroup;
    sign_up: FormGroup;
    animateLoginSwitchState: string;
    animateLoginFadeState: string;
    animateSigninSwitchState: string;
    animateSigninFadeState: string;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private signInService: SignInService) { }

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

    animateToSignUp() {
        this.animateLoginSwitchState = 'switch-finish';
        this.animateLoginFadeState = 'fade-start';
        this.animateSigninSwitchState = 'switch-start';
        this.animateSigninFadeState = 'fade-finish';
    }

    login() {
        this.signInService
            .loginUser(this.log_in.value.email, this.log_in.value.password)
            .then(auth => {
                auth.getIdToken().then(token => {
                    if (this.log_in.value.remember_me) {
                        this.signInService.setRememberMe(auth.uid);
                    }

                    this.signInService.saveToken(token, auth.uid);
                    this.signInService.redirectUser(auth);
                });
            })
            .catch(error => {
                this.error = error.message;
            });
    }
}
