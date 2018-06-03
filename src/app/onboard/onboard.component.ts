import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-onboard',
    templateUrl: './onboard.component.html',
    styleUrls: ['./onboard.component.scss'],
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
                animate(500, style({
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
export class OnboardComponent implements OnInit {
    animateLoginSwitchState: string;
    animateLoginFadeState: string;
    animateRegisterSwitchState: string;
    animateRegisterFadeState: string;
    animatePasswordSwitchState: string;
    animatePasswordFadeState: string;

    constructor() { }

    ngOnInit() {
        this.animateState('login');
    }

    animateToRegister() {
        this.animateLoginSwitchState = 'switch-finish';
        this.animateLoginFadeState = 'fade-start';
        this.animateRegisterSwitchState = 'switch-start';
        this.animateRegisterFadeState = 'fade-finish';
    }

    animateToLogin() {
        this.animateLoginSwitchState = 'switch-start';
        this.animateLoginFadeState = 'fade-finish';
        this.animateRegisterSwitchState = 'switch-finish';
        this.animateRegisterFadeState = 'fade-start';
        this.animatePasswordSwitchState = 'switch-finish';
        this.animatePasswordFadeState = 'fade-start';
    }

    animateToResetPassword() {
        this.animateLoginSwitchState = 'switch-finish';
        this.animateLoginFadeState = 'fade-start';
        this.animatePasswordSwitchState = 'switch-start';
        this.animatePasswordFadeState = 'fade-finish';
    }

    animateState(stateName: String) {
        switch (stateName) {
            case 'reset_password':
                this.animateToResetPassword();
                break;
            case 'register':
                this.animateToRegister();
                break;
            case 'login':
            default:
                this.animateToLogin();
                break;
        }
    }
}
