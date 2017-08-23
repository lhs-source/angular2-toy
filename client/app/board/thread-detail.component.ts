import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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

    thre = {};
    id : string;

    constructor(
        private ThreadService: ThreadService,
        private route: ActivatedRoute,
        private location: Location,
        private router : Router,
      ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.ThreadService.getThread({_id : this.id})
                            .subscribe(thread => {this.thre = thread;});
    }

    goBack(): void {
        //this.location.back();
        this.router.navigate(['/thread/thread-list']);
    }
    goEdit(): void {
        this.router.navigate(['/thread/thread-edit', this.id]);
    }
}