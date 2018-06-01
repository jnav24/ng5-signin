import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardComponent } from './onboard.component';
import {LoginComponent} from '@app/onboard/login/login.component';
import {RegisterComponent} from '@app/onboard/register/register.component';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
    MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from '@app/onboard/login/login.service';
import {RegisterService} from '@app/onboard/register/register.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

class RegisterServiceStub {}
class LoginServiceStub {}

describe('OnboardComponent', () => {
    let component: OnboardComponent;
    let fixture: ComponentFixture<OnboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                OnboardComponent,
                LoginComponent,
                RegisterComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                MatButtonModule,
                MatCardModule,
                MatCheckboxModule,
                MatIconModule,
                MatInputModule,
                MatMenuModule,
                MatRippleModule,
                MatToolbarModule,
                ReactiveFormsModule
            ],
            providers: [
                { provide: LoginService, useClass: LoginServiceStub },
                { provide: RegisterService, useClass: RegisterServiceStub }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OnboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
