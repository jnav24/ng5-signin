import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UsersService} from '@app/common/services/users.service';
import {Observable} from 'rxjs/Observable';
import {UserInterface} from '@app/common/interfaces/user.interface';

@Injectable()
export class UsersResolver implements Resolve<UserInterface> {
    constructor(private usersService: UsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        // console.log(this.usersService.getAuth());
            // .subscribe(auth => {
            //     this.usersService
            //         .getUserByUid(auth.uid);
            // });
    //     return this.usersService.getCurrentUser(route.params['uid']).first();
        return true;
    }
}
