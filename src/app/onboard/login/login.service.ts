import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {FirebaseDbService} from '@app/common/services/firebase-db.service';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class LoginService {
    user: Observable<any>;
    private router: Router;
    private route: ActivatedRoute;

    constructor(
        private firebaseDb: FirebaseDbService,
        private afs: AngularFirestore,
        private af: AngularFireDatabase,
        private auth: AngularFireAuth) {
        this.user = auth.authState;
    }

    loginUser(email: string, pass: string): Promise<any> {
        return this.auth.auth.signInWithEmailAndPassword(email, pass);
    }

    logOutAndRedirect() {
        this.logoutUser()
            .then(auth => {
                this.router.navigate(['login']);
            })
            .catch(error => console.log(error));
    }

    logoutUser() {
        this.removeToken(this.auth.auth.currentUser.uid);
        return this.auth.auth.signOut();
    }

    removeToken(uid) {
        let user;

        if (this.firebaseDb.isFirebase()) {
            user = this.af.object(`users/${uid}`);
            return user.update({ token: '' });
        }

        user = this.afs.collection(`users`).doc(uid);
        return user.update({ token: '' });
    }

    setRememberMe(uid) {
        let user;
        const data = { remember_me: true };

        if (this.firebaseDb.isFirebase()) {
            user = this.af.object(`users/${uid}`);
            return user.update(data);
        }

        user = this.afs.collection('users').doc(uid);
        return user.update(data);
    }

    saveToken(token, uid) {
        let user;

        if (this.firebaseDb.isFirebase()) {
            user = this.af.object(`users/${uid}`);
            return user.update({ token: token});
        }

        user = this.afs.collection(`users/`).doc(uid);
        return user.update({ token: token});
    }

    redirectUser(user) {
        if (user !== null && typeof user.uid !== 'undefined') {
            this.router.navigate(['dashboard', user.uid]);
        }
    }
}
