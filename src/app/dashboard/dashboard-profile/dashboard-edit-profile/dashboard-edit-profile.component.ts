import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {UsersService} from '@app/common/services/users.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './dashboard-edit-profile.component.html',
    styleUrls: ['./dashboard-edit-profile.component.scss']
})
export class DashboardEditProfileComponent implements OnInit {
    profile: FormGroup;
    user: UserInterface;

    constructor(private usersService: UsersService,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.user = this.usersService.getUser();

        this.profile = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(3)]],
            last_name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]]
        });

        this.profile.setValue({
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            email: this.user.email
        });
    }

    disallowSave() {
        const matches = Object.keys(this.profile.value).filter(key => {
            return this.user[key] === this.profile.value[key];
        });

        return matches.length === Object.keys(this.profile.value).length || !this.profile.valid;
    }
}
