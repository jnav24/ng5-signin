// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
    MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

// Config
import { RouterConfig } from '@app/config/router.config';
import {environmentConfig} from '@app/config/environment.config';

// Components
import { AppComponent } from '@app/app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OnboardComponent } from './onboard/onboard.component';
import { LoginComponent } from './onboard/login/login.component';
import { RegisterComponent } from './onboard/register/register.component';
import { ResetPasswordComponent } from './onboard/reset-password/reset-password.component';

// Guard
import {SignInAuthGuard} from '@app/auth/sign-in-auth.guard';

// Directives
import {RegisterValidationDirective} from '@app/onboard/register/register-validation.directive';

// Services
import {LoginService} from '@app/onboard/login/login.service';
import {RegisterService} from '@app/onboard/register/register.service';



@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        RegisterComponent,
        OnboardComponent,
        LoginComponent,
        ResetPasswordComponent,
        RegisterValidationDirective,
    ],
    imports: [
        AngularFireModule.initializeApp(environmentConfig.firebase),
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatRippleModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        ReactiveFormsModule,
        RouterModule.forRoot(RouterConfig),
    ],
    providers: [
        AngularFireDatabase,
        AngularFireAuth,
        LoginService,
        RegisterService,
        SignInAuthGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
