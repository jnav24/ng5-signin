import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './dashboard-edit-profile.component.html',
    styleUrls: ['./dashboard-edit-profile.component.scss']
})
export class DashboardEditProfileComponent implements OnInit {
    profile: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.profile = this.fb.group({
            fname: [],
            lname: [],
            email: []
        });
    }
}
