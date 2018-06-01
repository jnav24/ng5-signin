import {Route} from '@angular/router';
import {DashboardComponent} from '@app/dashboard/dashboard.component';
import {SignInAuthGuard} from '@app/auth/sign-in-auth.guard';
import {OnboardComponent} from '@app/onboard/onboard.component';

export const RouterConfig: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: OnboardComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [SignInAuthGuard],
        children: [
            { path: ':uid', component: DashboardComponent }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
