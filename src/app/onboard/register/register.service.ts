import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class RegisterService {
    user: Observable<any>;
    private router: Router;
    private route: ActivatedRoute;

    constructor(
        private af: AngularFireDatabase,
        private auth: AngularFireAuth) {
        this.user = auth.authState;
    }

    createNewUser() {
        return true;
    }
}
