import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
    MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

class ResetPasswordServiceStub {}

describe('ResetPasswordComponent', () => {
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ResetPasswordComponent ],
            imports: [
                FormsModule,
                MatButtonModule,
                MatCardModule,
                MatCheckboxModule,
                MatIconModule,
                MatInputModule,
                MatMenuModule,
                MatRippleModule,
                MatToolbarModule,
                ReactiveFormsModule
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
