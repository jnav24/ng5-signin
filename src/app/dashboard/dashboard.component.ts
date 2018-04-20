import { Component, OnInit } from '@angular/core';
import {SignInService} from '@app/sign-in/sign-in.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
      private signInService: SignInService
  ) { }

  ngOnInit() {
  }

  logout() {
      return this.signInService.logOutAndRedirect();
  }
}
