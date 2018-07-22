import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {UsersService} from '@app/common/services/users.service';
import {LogService} from '@app/common/services/log.service';
import {LogInterface} from '@app/common/interfaces/log.interface';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './dashboard-edit-profile.component.html',
    styleUrls: ['./dashboard-edit-profile.component.scss']
})
export class DashboardEditProfileComponent implements OnInit {
    profile: FormGroup;
    user: UserInterface;

    constructor(private usersService: UsersService,
                private logService: LogService,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.user = this.usersService.getUser();

        this.profile = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(3)]],
            last_name: ['', [Validators.required, Validators.minLength(3)]],
        });

        this.profile.setValue({
            first_name: this.user.first_name,
            last_name: this.user.last_name,
        });
    }

    disallowSave() {
        const matches = Object.keys(this.profile.value).filter(key => {
            return this.user[key] === this.profile.value[key];
        });

        return matches.length === Object.keys(this.profile.value).length || !this.profile.valid;
    }

    async updateProfile() {
        // add update info; to firebase auth and db
        // add password reset functionality to firebase auth
        // save image functionality; update user singleton, save to storage and db
        try {
            // if (this.user.email !== this.profile.value.email) {
            //     await this.usersService.updateUserEmail(this.profile.value.email);
            // }
            await this.usersService.updateUser(this.usersService.getUserUid().toString(), this.profile.value);
            this.usersService.updateUserSession(this.profile.value);
            this.user = this.usersService.getUser();
        } catch (error) {
            const log: LogInterface = {
                page: 'edit-profile',
                message: error.message,
                level: 'error'
            };

            this.logService.writeLog(log);
            // return a fail message
        }
    }
}
