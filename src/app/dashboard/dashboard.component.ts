import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from '@app/onboard/login/login.service';
import {ActivatedRoute} from '@angular/router';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        trigger('fromLogin', [
            state('finish', style({
                opacity: 0,
                top: '-9999px'
            })),
            transition('* => finish', animate('1250ms 0ms ease-in'))
        ]),
        trigger('showMenu', [
            transition('* => finish', [
                query(':self', style({ transform: 'translateY(-100%)' })),
                query('.nav__logo, .nav__profile', style({ opacity: 0 })),
                query(':self', animate('500ms 350ms ease-out', style({
                    transform: 'translateY(0)'
                }))),
                query('.nav__logo, .nav__profile', animate(500, style({ opacity: 1 }))),
            ])
        ]),
        trigger('fadeIn', [
            state('finish', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            transition('* => finish', [
                animate('500ms 800ms ease-out')
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
            this.fromLoginState = 'finish';
            this.showMenuState = 'finish';
            this.fadeState = 'finish';
            this.loginService.setIsFromLogin(false);
        }
    }

    logout() {
        return this.loginService.logOutAndRedirect();
    }
}
