import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {SignInService} from '@app/sign-in/sign-in.service';

@Injectable()
export class SignInAuthGuard implements CanActivate {
    private canLogin: boolean;
    private user_data;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private signInService: SignInService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.authLogin();
        return this.canLogin;
    }

    authLogin() {
        if (!this.signInService.user) {
            this.router.navigate(['']);
            this.canLogin = false;
            return false;
        }

        this.signInService.user.subscribe(user => {
            if (user === null) {
                this.router.navigate(['']);
                this.canLogin = false;
                return false;
            }

            if (typeof this.route.snapshot.params['uid'] === 'undefined') {
                this.router.navigate(['dashboard', user.uid]);
            }

            if (user.uid !== this.route.snapshot.params['uid']) {
                this.router.navigate(['dashboard', user.uid]);
            }

            this.canLogin = true;

            this.signInService.getUser(user.uid).valueChanges().subscribe(user_data => {
                this.user_data = user_data;

                user.getIdToken().then(token => {
                    if (token !== this.user_data.token && !this.user_data.remember_me) {
                        this.signInService.logOutAndRedirect();
                    }
                });
            });
        });
    }
}
