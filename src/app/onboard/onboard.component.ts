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
export class OnboardComponent implements OnInit {
    animateLoginSwitchState: string;
    animateLoginFadeState: string;
    animateSigninSwitchState: string;
    animateSigninFadeState: string;

    constructor() { }

    ngOnInit() {}

    animateToSignUp() {
        this.animateLoginSwitchState = 'switch-finish';
        this.animateLoginFadeState = 'fade-start';
        this.animateSigninSwitchState = 'switch-start';
        this.animateSigninFadeState = 'fade-finish';
    }
}
