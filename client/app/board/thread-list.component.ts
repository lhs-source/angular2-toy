import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


import { ThreadService } from './thread.service';

@Component({
    selector: 'thread-list',
    templateUrl: './thread-list.component.html',
    styleUrls: ['./thread-list.component.css'],
})

export class ThreadListComponent implements OnInit{
    threads : any[];
    category : string;
    page : number;

    constructor(private router : Router,
        private threServ : ThreadService,
        private route: ActivatedRoute,
    ){}

    ngOnInit() {
        this.category = this.route.snapshot.paramMap.get('category');
        if(!this.category){
            this.router.navigate(['thread/thread-list', 'default']);
        }
        this.threServ.getThreads({category : this.category}).subscribe(
            rep => {
                this.threads = rep; 
                console.log(this.threads)
            },
            error => {console.log(error);},
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