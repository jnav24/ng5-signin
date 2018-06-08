import {Route} from '@angular/router';
import {DashboardComponent} from '@app/dashboard/dashboard.component';
import {DashboardAuthGuard} from '@app/dashboard/dashboard-auth.guard';
import {OnboardComponent} from '@app/onboard/onboard.component';

export const RouterConfig: Route[] = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: OnboardComponent },
    { path: 'register', component: OnboardComponent },
    { path: 'reset_password', component: OnboardComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [DashboardAuthGuard],
        // children: [
        //     { path: ':uid', component: DashboardComponent }
        // ]
    },
    { path: '**', redirectTo: 'login' }
];
