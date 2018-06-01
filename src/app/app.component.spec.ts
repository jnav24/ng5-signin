// import {TestBed, async, ComponentFixture, fakeAsync} from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { RouterConfig } from '@app/config/router.config';
// import {Router, RouterOutlet} from '@angular/router';
// import {Location} from '@angular/common';
// import {SignInComponent} from '@app/sign-in/sign-in.component';
// import {DashboardComponent} from '@app/dashboard/dashboard.component';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {
//     MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
//     MatToolbarModule
// } from '@angular/material';
// import {By} from '@angular/platform-browser';
//
// describe('AppComponent', () => {
//     let component: AppComponent;
//     let fixture: ComponentFixture<AppComponent>;
//     let router: Router;
//     let location: Location;
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 AppComponent,
//                 SignInComponent,
//                 DashboardComponent
//             ],
//             imports: [
//                 FormsModule,
//                 MatButtonModule,
//                 MatCardModule,
//                 MatCheckboxModule,
//                 MatIconModule,
//                 MatInputModule,
//                 MatMenuModule,
//                 MatRippleModule,
//                 MatToolbarModule,
//                 ReactiveFormsModule,
//                 RouterTestingModule.withRoutes(RouterConfig)
//             ]
//         }).compileComponents();
//     }));
//
//     beforeEach(() => {
//         router = TestBed.get(Router);
//         location = TestBed.get(Location);
//         fixture = TestBed.createComponent(AppComponent);
//         router.initialNavigation();
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });
//
//     it('should create an app', () => {
//         expect(component).toBeTruthy();
//     });
//
//     it('should have a router outlet', () => {
//         const outlet = fixture.debugElement.query(By.directive(RouterOutlet));
//         expect(outlet).not.toBeNull();
//     });
//
//     it('navigate to "" redirects you to login page', <any>fakeAsync(() => {
//         router.navigate([''])
//             .then(() => {
//                 expect(router.url).toEqual('/');
//             });
//     }));
//
//     it('random string should redirect you to login page', <any>fakeAsync(() => {
//         router.navigate(['pizza'])
//             .then(() => {
//                 expect(router.url).toEqual('/');
//             });
//     }));
//
//     it('"login" should redirect you to login page', <any>fakeAsync(() => {
//         router.navigate(['login'])
//             .then(() => {
//                 expect(router.url).toEqual('/');
//             });
//     }));
//
//     it('"dashboard" should redirect you to login page', <any>fakeAsync(() => {
//         router.navigate(['dashboard'])
//             .then(() => {
//                 expect(router.url).toEqual('/');
//             });
//     }));
// });
