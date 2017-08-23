import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';


import { ThreadService } from './thread.service';

@Component({
    selector: 'thread-list',
    templateUrl: './thread-list.component.html',
    styleUrls: ['./thread-list.component.css'],
})

export class ThreadListComponent implements OnInit{
    threads : any[];

    constructor(private router : Router,
        private threServ : ThreadService){}

    ngOnInit() {
        this.threServ.getThreads().subscribe(
            rep => {this.threads = rep; console.log(this.threads)},
            error => {console.log(error)},
            () => {} ,
        );
    }
    newThre() {
        this.router.navigate(['thread/thread-add']);
    }
    move(_id : string){
        this.router.navigate(['/thread/thread-detail', _id]);
    }
}