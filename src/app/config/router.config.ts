import {Route} from '@angular/router';
import {SignInComponent} from '@app/sign-in/sign-in.component';
import {DashboardComponent} from '@app/dashboard/dashboard.component';
import {SignInAuthGuard} from '@app/auth/sign-in-auth.guard';

const myPath = '';
export const RouterConfig: Route[] = [
    { path: '', redirectTo: myPath + 'login', pathMatch: 'full' },
    { path: myPath + 'login', component: SignInComponent },
    {
        path: myPath + 'dashboard',
        component: DashboardComponent,
        canActivate: [SignInAuthGuard],
        children: [
            { path: ':uid', component: DashboardComponent }
        ]
    },
    { path: myPath + '**', redirectTo: 'login' }
];
