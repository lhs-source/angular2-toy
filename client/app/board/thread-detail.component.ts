import { Component, ViewChild, ViewChildren, ElementRef, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { Location }                 from '@angular/common';

import { AuthService } from '../user/auth.service';
import { ThreadService } from './thread.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'thread-detail',
    templateUrl: './thread-detail.component.html',
    styleUrls: ['./thread-detail.component.css'],
})

export class ThreadDetailComponent implements OnInit {
    ///////////
    // objects
    ///////////

    thre = {
        comments : []
    };
    category : string;
    id : string;
    page : string;

    //////////////
    // contructor
    //////////////

    constructor(
        private ThreadService: ThreadService,
        private route: ActivatedRoute,
        private location: Location,
        private router : Router,
        private auth: AuthService,
      ) {
        router.events.subscribe(event =>{
            if(event instanceof NavigationEnd){
                const tree = router.parseUrl(router.url);
                console.log(tree.fragment);
                if(tree.fragment){
                    const element = document.getElementById(tree.fragment);
                    console.log(element);
                    if(element) {
                        element.scrollIntoView(element);
                    }
                }
            }
        });


      }

    /////////////
    // lifecycle
    /////////////

    ngOnInit(): void {

        // 파라미터 가져오기 
        this.category = this.route.snapshot.paramMap.get('category');
        this.id = this.route.snapshot.paramMap.get('id');
        this.page = this.route.snapshot.paramMap.get('page');

        // 파라미터로 받은 id 갖고 스레드 가져오기
        const condition = {_id : this.id};
        this.ThreadService.getThread(condition).subscribe(
            res => {
                this.thre = res;
                console.log(this.thre);
                // 부모가 있으면 parent_comment에 부모댓글 넣어주기
                this.thre.comments.forEach(
                    entry => {
                        if(entry._parent_id != '-1'){
                            entry.parent_comment = this.thre.comments.filter(com => com._id === entry._parent_id).pop();
                        }
                    }
                );
            }
        );
    }

    ///////////
    // methods
    ///////////

    // 뒤로가기
    goBack(): void {
        //this.location.back();
        this.router.navigate(['/thread/list', this.category, this.page]);
    }
    // 스레 수정
    goEdit(): void {
        this.router.navigate(['/thread/edit', this.id, this.page]);
    }
    // 스레 삭제
    goDelete(): void {
        const condition = {_id : this.id};
        this.ThreadService.deleteThread(condition).subscribe(
            res => {
                console.log(res);
            },
            error => {
                console.log(error)
            },
            () => {}
        );
        this.router.navigate(['/thread/list']);
    }

}