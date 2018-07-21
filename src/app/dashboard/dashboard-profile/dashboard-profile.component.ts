import { Component, OnInit } from '@angular/core';
import {UsersService} from '@app/common/services/users.service';

@Component({
    selector: 'app-dashboard-profile',
    templateUrl: './dashboard-profile.component.html',
    styleUrls: ['./dashboard-profile.component.scss']
})
export class DashboardProfileComponent implements OnInit {

    constructor(private usersService: UsersService) { }

    ngOnInit() {}

    detectFiles(event) {
        console.log(event.target.files);
        // this.imageFile = event.target.files[0];
        // this.loadPreview(this.imageFile);
    }

    openFileBrowser() {
        const element: HTMLElement = document.getElementById('edit-profile-input') as HTMLElement;
        element.click();
    }
}
