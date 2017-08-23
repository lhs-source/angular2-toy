import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { ThreadService } from './thread.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'thread-detail',
    templateUrl: './thread-detail.component.html',
    styleUrls: ['./thread-detail.component.css'],
})

export class ThreadDetailComponent implements OnInit {

    thread : any;

    constructor(
        private ThreadService: ThreadService,
        private route: ActivatedRoute,
        private location: Location
      ) {}

    ngOnInit(): void {
    this.route.paramMap
        .switchMap((params: ParamMap) => this.ThreadService.getThread(+params.get('_id')))
        .subscribe(thread => this.thread = thread);
    }

    goBack(): void {
    this.location.back();
    }
}