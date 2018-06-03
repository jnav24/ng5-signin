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
import {By} from '@angular/platform-browser';
import {ResetPasswordComponent} from '@app/onboard/reset-password/reset-password.component';
import { Route } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

const routes: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: OnboardComponent },
    { path: 'reset_password', component: OnboardComponent },
    { path: 'register', component: OnboardComponent },
    { path: '**', redirectTo: 'login' }
];

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
                ResetPasswordComponent,
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
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(routes)
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

    it('should have login component', () => {
        const loginTag = fixture.debugElement.query(By.css('app-login'));
        expect(loginTag).not.toBeNull();
    });

    it('should have register component', () => {
        const registerTag = fixture.debugElement.query(By.css('app-register'));
        expect(registerTag).not.toBeNull();
    });

    it('should have reset component', () => {
        const registerTag = fixture.debugElement.query(By.css('app-reset-password'));
        expect(registerTag).not.toBeNull();
    });
});
