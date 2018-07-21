import { Component, OnInit } from '@angular/core';
import {UsersService} from '@app/common/services/users.service';
import {UserInterface} from '@app/common/interfaces/user.interface';

@Component({
    selector: 'app-dashboard-profile',
    templateUrl: './dashboard-profile.component.html',
    styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {
    user: UserInterface;

    constructor(private usersService: UsersService) { }

    ngOnInit() {
        this.user = this.usersService.getUser();
    }

    detectFiles(event) {
        console.log(event.target.files);
        // this.imageFile = event.target.files[0];
        // this.loadPreview(this.imageFile);
    }

    openFileBrowser() {
        const element: HTMLElement = document.getElementById('edit-profile-input') as HTMLElement;
        element.click();
    }

    hasImage() {
        return typeof this.user.image !== 'undefined' && this.user.image.trim().length;
    }
}
