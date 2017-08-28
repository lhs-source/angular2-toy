import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


import { ThreadService } from './thread.service';

@Component({
    selector: 'thread-list',
    templateUrl: './thread-list.component.html',
    styleUrls: ['./thread-list.component.css'],
})

export class ThreadListComponent implements OnInit{
    ///////////
    // objects
    ///////////

    threads : any[];
    category : string;
    page : string;
    count : number;
    countArray = [];
    
    //////////////
    // contructor
    //////////////

    constructor(private router : Router,
        private threServ : ThreadService,
        private route: ActivatedRoute,
    ){}

    /////////////
    // lifecycle
    /////////////

    ngOnInit() {
        // 파라미터 받아오기
        this.category = this.route.snapshot.paramMap.get('category');
        this.page = this.route.snapshot.paramMap.get('page');

        // 파라미터가 뭔가 부족하면        
        if(!this.category){
            this.router.navigate(['thread/thread-list', 'default', '1']);
        }
        if(!this.page){
            this.router.navigate(['thread/thread-list', this.category, '1']);
        }
        
        // 카테고리 안의 스레 개수
        this.threServ.countThreads({category : this.category}).subscribe(
            res => { 
                console.log("count");
                console.log(res);
                this.count = res;
                
                if(Math.ceil(this.count / 5) < this.count){
                    this.router.navigate(['thread/thread-list', this.category, '1']);
                    return;
                }
                const perPage = 5;
                const perPagi = 3;
                let pagiStart = ((((parseInt(this.page) - 1) | 0) / 3) * 3 + 1);
                let arrayLength = Math.ceil(this.count / perPage);
                console.log(pagiStart);
                console.log(arrayLength);
                if(arrayLength - pagiStart < 3){
                    arrayLength -= (pagiStart - 1);
                }
                else{
                    arrayLength = perPagi;
                }
                let pagiLength = (Math.ceil(this.count / perPage) + 1);
                // if(perPagi <= arrayLength){
                //     arrayLength = perPagi;
                // }
                let i = 0;
                this.countArray = new Array(arrayLength).fill(pagiStart | 0).map(value => value + i++);
                console.log(this.countArray);
            },
            error => { console.log(error);}
            
        );
        // 스레 가져오기
        this.threServ.getThreads({category : this.category, page : this.page}).subscribe(
            rep => {
                this.threads = rep; 
                console.log(this.threads)
            },
            error => {console.log(error);},
            () => {} ,
        );
    }
    
    ///////////
    // methods
    ///////////

    // 새 스레
    newThre() {
        this.router.navigate(['thread/thread-add']);
    }
    // 스레 확인
    move(_id : string){
        this.router.navigate(['/thread/thread-detail', _id]);
    }
    
    pageMove(move : number){
        let pageNum = parseInt(this.page) + move;
        if(pageNum <= 0){
            return;
        }
        this.page = pageNum.toString();
        this.router.navigate(['thread/thread-list', this.category, this.page]);
        // this.threServ.getThreads({category : this.category, page : this.page}).subscribe(
        //     rep => {
        //         this.threads = rep; 
        //         console.log(this.threads)
        //     },
        //     error => {console.log(error);},
        //     () => {} ,
        // );
    }
    pageMoveAbsolute(move : number){
        let pageNum = move;
        if(move === -1){
            pageNum = Math.ceil(this.count / 5);
        }
        if(pageNum <= 0){
            return;
        }
        this.page = pageNum.toString();
        this.router.navigate(['thread/thread-list', this.category, this.page]);
        // this.threServ.getThreads({category : this.category, page : this.page}).subscribe(
        //     rep => {
        //         this.threads = rep; 
        //         console.log(this.threads)
        //     },
        //     error => {console.log(error);},
        //     () => {} ,
        // );
    }
}