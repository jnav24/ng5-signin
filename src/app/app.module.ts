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
import { firebaseConfig } from '@app/config/firebase.config';

// Components
import { AppComponent } from '@app/app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';

// Guard
import {SignInAuthGuard} from '@app/auth/sign-in-auth.guard';

// Services
import {SignInService} from '@app/sign-in/sign-in.service';


@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        DashboardComponent,
        RegisterComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(firebaseConfig),
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
        SignInAuthGuard,
        SignInService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
