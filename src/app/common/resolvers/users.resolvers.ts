import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UsersService} from '@app/common/services/users.service';
import {Observable} from 'rxjs/Observable';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {LogService} from '@app/common/services/log.service';
import * as moment from 'moment';

@Injectable()
export class UsersResolver implements Resolve<UserInterface> {
    private user;
    constructor(private usersService: UsersService,
                private log: LogService) {}

    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
       try {
           const authenticatedUser = await new Promise(resolve => {
               this.user = this.usersService
                   .getUserByUid(this.usersService.getUserUid().toString())
                   .subscribe(user => {
                       resolve(user);
                   });
           });

           this.user.unsubscribe();
           return authenticatedUser;
       } catch (error) {
           const log = {
               level: 'error',
               message: error.message,
               page: 'users-resolver.resolve',
               created: moment().toString()
           };
           this.log.writeLog(log);
       }

    }
}
