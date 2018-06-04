import { TestBed, inject } from '@angular/core/testing';
import { LoginService } from './login.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import {environmentConfig} from '@app/config/environment.config';
import {FirebaseDbService} from '@app/common/services/firebase-db.service';

describe('LoginService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environmentConfig.firebase),
            ],
            providers: [
                AngularFireDatabase,
                AngularFireAuth,
                LoginService,
                FirebaseDbService,
            ]
        });
    });

    it('should be created', inject([LoginService], (service: LoginService) => {
        expect(service).toBeTruthy();
    }));
});
