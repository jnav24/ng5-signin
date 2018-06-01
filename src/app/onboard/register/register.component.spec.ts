import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import {
    MatButtonModule,
    MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, MatMenuModule, MatRippleModule,
    MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterService} from './register.service';

class RegisterServiceStub {
    createNewUser() {}
}

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let service: RegisterService;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RegisterComponent ],
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
            providers: [
                { provide: RegisterService, useClass: RegisterServiceStub }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        service = TestBed.get(RegisterService);
        component = fixture.componentInstance;
        component.ngOnInit();
    });

    it('form invalid when empty', () => {
        expect(component.signup.valid).toBeFalsy();
    });
});
