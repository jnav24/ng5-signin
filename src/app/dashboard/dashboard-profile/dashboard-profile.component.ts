import { Component, OnInit } from '@angular/core';
import {UsersService} from '@app/common/services/users.service';
import {UserInterface} from '@app/common/interfaces/user.interface';
import {MatDialog} from '@angular/material';
import {FlashMessageComponent} from '@app/dialogs/flash-message/flash-message.component';
import {UploadService} from '@app/common/services/upload.service';

@Component({
    selector: 'app-dashboard-profile',
    templateUrl: './dashboard-profile.component.html',
    styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {
    user: UserInterface;

    constructor(public dialog: MatDialog,
                private uploadService: UploadService,
                private usersService: UsersService) { }

    ngOnInit() {
        this.user = this.usersService.getUser();
    }

    detectFiles(event) {
        const imageFile = event.target.files[0];
        console.log(imageFile);
        console.log(imageFile.name);

        if (this.validateImageType(imageFile) && this.validateImageSize(imageFile)) {
            this.dialog.open(FlashMessageComponent, {
                data: {
                    promise: new Promise((resolve, reject) => {
                        // upload image
                        // update user session
                        const filename = this.uploadService.getProfilePath(this.usersService.getUserUid().toString(), imageFile.name);

                        if (typeof this.user.image !== 'undefined' || this.user.image) {
                            const image = this.uploadService.getProfilePath(this.usersService.getUserUid().toString(), this.user.image);
                            this.uploadService.deleteFile(image);
                        }

                        this.uploadService
                            .uploadFile(filename, imageFile)
                            .then(res => {
                                if (res.state === 'success') {
                                    this.user.image = this.uploadService.getImageName(filename);
                                    this.usersService.setUser(this.user);
                                    resolve();
                                }
                            })
                            .catch(error => {
                                reject();
                            });
                    }),
                    status: {
                        success: {},
                        error: {}
                    }
                }
            });
        }
    }

    openFileBrowser(): void {
        const element: HTMLElement = document.getElementById('edit-profile-input') as HTMLElement;
        element.click();
    }

    hasImage() {
        return typeof this.user.image !== 'undefined' && this.user.image.trim().length;
    }

    private validateImageType(file: File): boolean {
        const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (acceptedTypes.indexOf(file.type) < 0) {
            this.dialog.open(FlashMessageComponent, {
                data: {
                    promise: new Promise((resolve, reject) => {
                        reject();
                    }),
                    status: {
                        error: {
                            message: 'That image file type is not supported. Upload a jpg, gif, or png instead.'
                        }
                    }
                }
            });

            return false;
        }

        return true;
    }

    private validateImageSize(file: File): boolean {
        return true;
    }
}
