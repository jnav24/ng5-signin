import { Component, OnInit } from '@angular/core';
import {LogService} from '@app/common/services/log.service';

@Component({
    selector: 'app-dashboard-logs',
    templateUrl: './dashboard-logs.component.html',
    styleUrls: ['./dashboard-logs.component.scss']
})
export class DashboardLogsComponent implements OnInit {
    constructor(private log: LogService) { }

    ngOnInit() {
        this.log.getLogs().subscribe(logs => console.log(logs));
    }
}
