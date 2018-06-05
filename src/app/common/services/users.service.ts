import {Injectable} from '@angular/core';
import {FirebaseDbService} from '@app/common/services/firebase-db.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFirestore} from 'angularfire2/firestore';
import {UserInterface} from '@app/common/interfaces/user.interface';

@Injectable()
export class UsersService {
    private uid: String;

    constructor(private fdb: FirebaseDbService,
                private afs: AngularFirestore,
                private af: AngularFireDatabase) {}

    addUser(data: UserInterface, uid: string): Promise<any> {
        let user;

        if (this.fdb.isFirebase()) {
            user = this.af.object(`/users/${uid}`);
            return user.set(data);
        }

        user = this.afs.collection('users').doc(uid);
        return user.set(data);
    }

    getUserUid(): String {
        return this.uid;
    }

    setUserUid(uid: String) {
        if (this.getUserByUid(uid)) {
            this.uid = uid;
        }
    }

    getUserByUid(uid: String): Boolean {
        return true;
    }
}
