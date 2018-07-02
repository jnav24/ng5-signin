import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '@app/onboard/login/login.service';
import {ActivatedRoute} from '@angular/router';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {animate, query, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        trigger('fromLogin', [
            transition('* => login', animate('1250ms 0ms ease-in', style({
                opacity: 0,
                top: '-9999px'
            }))),
            transition('* => logout', animate('1250ms 500ms ease-out', style({
                opacity: 1,
                top: '0'
            }))),
        ]),
        trigger('showMenu', [
            transition('* => login', [
                query(':self', style({ transform: 'translateY(-100%)' })),
                query('.nav__logo, .nav__profile', style({ opacity: 0 })),
                query(':self', animate('500ms 350ms ease-out', style({
                    transform: 'translateY(0)'
                }))),
                query('.nav__logo, .nav__profile', animate(500, style({ opacity: 1 }))),
            ]),
            transition('* => logout', [
                query(':self', style({ transform: 'translateY(0)' })),
                query('.nav__logo, .nav__profile', style({ opacity: 1 })),
                query(':self', animate('500ms 250ms ease-in', style({
                    transform: 'translateY(-100%)'
                }))),
                query('.nav__logo, .nav__profile', animate(500, style({ opacity: 0 }))),
            ]),
        ]),
        trigger('fadeIn', [
            state('logout', style({
                opacity: 0,
                transform: 'translateY(-50%)'
            })),
            state('login', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            transition('* => login', [
                animate('500ms 800ms ease-out')
            ]),
            transition('* => logout', [
                animate('500ms ease-in')
            ])
        ])
    ]
})
export class DashboardComponent implements OnInit, OnDestroy {
    private userSubscription;
    fromLoginState: String;
    showMenuState: String;
    fadeState: String;
    showLoginAnimate: Boolean = false;
    user: UserInterface;

    constructor(private loginService: LoginService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.userSubscription = this.route.data.subscribe(user => this.user = user.user);
        this.animateFromLogin();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    private animateFromLogin() {
        if (this.loginService.isFromLogin()) {
            this.showLoginAnimate = true;
            this.fromLoginState = 'login';
            this.showMenuState = 'login';
            this.fadeState = 'login';
            this.loginService.setIsFromLogin(false);
        }
    }

    setAnimateState() {
        if (this.fromLoginState === 'logout') {
            this.showLoginAnimate = true;
        } else {
            this.showLoginAnimate = false;
        }
    }

    logout() {
        this.fromLoginState = 'logout';
        this.showMenuState = 'logout';
        this.fadeState = 'logout';
        setTimeout(() => {
            return this.loginService.logOutAndRedirect();
        }, 2000);
    }
}
