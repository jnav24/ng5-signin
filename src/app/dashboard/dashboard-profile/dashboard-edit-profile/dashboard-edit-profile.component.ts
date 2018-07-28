import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {UsersService} from '@app/common/services/users.service';
import {LogService} from '@app/common/services/log.service';
import {LogInterface} from '@app/common/interfaces/log.interface';
import {MatDialog} from '@angular/material';
import {FlashMessageComponent} from '@app/dialogs/flash-message/flash-message.component';
import {UploadService} from '@app/common/services/upload.service';
import {AngularFireUploadTask} from 'angularfire2/storage';

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
                private uploadService: UploadService,
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
            image: ''
        });

        this.image = this.user.image || '';
    }

    detectFiles(event) {
        this.imageFile = event.target.files[0];

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
        this.dialog.open(FlashMessageComponent, {
            data: {
                promise: new Promise(async (resolve, reject) => {
                    const updatedImage = {};

                    if (typeof this.imageFile.name !== 'undefined') {
                        const filename = this.uploadService.getProfilePath(this.usersService.getUserUid().toString(), this.imageFile.name);

                        try {
                            const res = await this.uploadImage(filename);

                            if (res.state === 'success') {
                                updatedImage['image_url'] = res.downloadURL;
                                updatedImage['image'] = this.uploadService.getImageName(filename);
                            }
                        } catch (error) {
                            const log: LogInterface = {
                                page: 'edit-profile.uploadImage',
                                message: error.message,
                                level: 'error'
                            };

                            this.logService.writeLog(log);
                            reject();
                        }
                    }

                    const data = Object.assign({}, this.setDataForSave(this.profile.value), updatedImage);

                    this.usersService
                        .updateUser(this.usersService.getUserUid().toString(), data)
                        .then(res => {
                            this.usersService.updateUserSession(data);
                            this.user = this.usersService.getUser();
                            resolve();
                        })
                        .catch(error => {
                            const log: LogInterface = {
                                page: 'edit-profile.updateUser',
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

    private uploadImage(filename: string): AngularFireUploadTask {
        if (typeof this.user.image !== 'undefined' || this.user.image) {
            const image = this.uploadService.getProfilePath(this.usersService.getUserUid().toString(), this.user.image);
            this.uploadService.deleteFile(image);
        }

        return this.uploadService.uploadFile(filename, this.imageFile);
    }

    private setDataForSave(data) {
        return {
            first_name: data.first_name,
            last_name: data.last_name
        };
    }
}

export class CustomValidator {
    static checkImage() {
        return (control: AbstractControl) => {
            const acceptedTypes = [
                'png',
                'jpg',
                'jpeg'
            ];
            const fileList = control.value.split('.');
            const extension = fileList[fileList.length - 1];

            if (control.value && acceptedTypes.indexOf(extension) < 0) {
                return { validateConfirm: false };
            }

            return null;
        };
    }
}
