// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

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
    RouterModule.forRoot(RouterConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
