import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    imageFile: File;
    image: string;
    error: string;
    private allowedImageSize: Number = 1.5;

    constructor(public dialog: MatDialog,
                private usersService: UsersService,
                private logService: LogService,
                private fb: FormBuilder) { }

    ngOnInit() {
        this.user = this.usersService.getUser();

        this.profile = this.fb.group({
            first_name: ['', [Validators.required, Validators.minLength(3)]],
            last_name: ['', [Validators.required, Validators.minLength(3)]],
            image: ['', [CustomValidator.checkImage()]]
        });

        this.profile.setValue({
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            image: null
        });

        this.image = this.user.image || '';
    }

    detectFiles(event) {
        this.imageFile = event.target.files[0];
        console.log(this.imageFile.size);

        if (this.getImageSize(this.imageFile.size) > this.allowedImageSize) {
            this.error = `Image size must be smaller than ${this.allowedImageSize} mb`;
            this.image = '';
            (<HTMLInputElement>document.getElementById('imageFile')).value = '';
            return false;
        }

        this.error = '';
        this.loadPreview(this.imageFile);
    }

    loadPreview(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
            this.image = reader.result;
        }, false);
    }

    private getImageSize(size: number): number {
        return (size / 1024) / 1024;
    }

    hasContactImage(): boolean {
        return typeof this.image !== 'undefined' && this.image !== '';
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

export class CustomValidator {
    static checkImage() {
        return (control: AbstractControl) => {
            if (!control.value) {
                return { validateConfirm: false };
            }

            const acceptedTypes = [
                'png',
                'jpg',
                'jpeg'
            ];
            const fileList = control.value.split('.');
            const extension = fileList[fileList.length - 1];

            if (acceptedTypes.indexOf(extension) < 0) {
                return { validateConfirm: false };
            }

            return null;
        };
    }
}
