// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from '@app/app.component';
import { SignInComponent } from './sign-in/sign-in.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
