import { TestBed, inject } from '@angular/core/testing';
import { LoginService } from './login.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import {firebaseConfig} from '@app/config/firebase.config';

describe('LoginService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(firebaseConfig),
            ],
            providers: [
                AngularFireDatabase,
                AngularFireAuth,
                LoginService,
            ]
        });
    });

    it('should be created', inject([LoginService], (service: LoginService) => {
        expect(service).toBeTruthy();
    }));
});
