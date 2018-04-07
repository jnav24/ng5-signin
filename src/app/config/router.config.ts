import {Route} from '@angular/router';
import {SignInComponent} from '@app/sign-in/sign-in.component';
import {DashboardComponent} from '@app/dashboard/dashboard.component';
import {SignInAuthGuard} from '@app/auth/sign-in-auth.guard';

export const RouterConfig: Route[] = [
  { path: 'login', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [SignInAuthGuard] },
  { path: '**', redirectTo: 'login' }
];
