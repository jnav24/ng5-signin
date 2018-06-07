import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UsersService} from '@app/common/services/users.service';

@Injectable()
export class SignInAuthGuard implements CanActivate {
    private canLogin: boolean;
    private user_data;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private usersService: UsersService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.usersService.getAuth() !== null;
    }
}
