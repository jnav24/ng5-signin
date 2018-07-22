import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {UsersService} from '@app/common/services/users.service';
import {LogService} from '@app/common/services/log.service';
import {LogInterface} from '@app/common/interfaces/log.interface';
import {MatDialog} from '@angular/material';
import {FlashMessageComponent} from '@app/dialogs/flash-message/flash-message.component';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './dashboard-edit-profile.component.html',
    styleUrls: ['./dashboard-edit-profile.component.scss']
})
export class DashboardEditProfileComponent implements OnInit {
    profile: FormGroup;
    user: UserInterface;

    constructor(public dialog: MatDialog,
                private usersService: UsersService,
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

    updateProfile() {
        // add update info; to firebase auth and db
        // add password reset functionality to firebase auth
        // save image functionality; update user singleton, save to storage and db
        this.dialog.open(FlashMessageComponent, {
            data: {
                promise: new Promise((resolve, reject) => {
                    this.usersService
                        .updateUser(this.usersService.getUserUid().toString(), this.profile.value)
                        .then(res => {
                            this.usersService.updateUserSession(this.profile.value);
                            this.user = this.usersService.getUser();
                            resolve();
                        })
                        .catch(error => {
                            const log: LogInterface = {
                                page: 'edit-profile',
                                message: error.message,
                                level: 'error'
                            };

                            this.logService.writeLog(log);
                            reject();
                        });
                }),
                status: {
                    success: {
                        title: 'Success',
                        message: 'Profile has been successfully updated.'
                    },
                    error: {
                        title: 'Error',
                        message: 'Unable to update your profile.'
                    }
                }
            }
        });
    }
}
