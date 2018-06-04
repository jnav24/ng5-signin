import {Injectable} from '@angular/core';

@Injectable()
export class UsersService {
    private uid: String;

    constructor() {}

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
