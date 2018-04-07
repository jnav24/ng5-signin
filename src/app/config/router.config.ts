import {Route} from '@angular/router';
import {SignInComponent} from '@app/sign-in/sign-in.component';

export const RouterConfig: Route[] = [
  { path: 'login', component: SignInComponent },
  { path: '**', redirectTo: 'login' }
];
