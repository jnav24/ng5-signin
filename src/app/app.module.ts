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

// Config
import { RouterConfig } from '@app/config/router.config';

// Components
import { AppComponent } from '@app/app.component';
import { SignInComponent } from './sign-in/sign-in.component';


@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
    ],
    imports: [
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
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
