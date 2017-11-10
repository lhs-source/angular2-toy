import { Component, ViewChild, ViewChildren, ElementRef, OnInit, Input } from '@angular/core'
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { Location }                 from '@angular/common';

import { AuthService } from '../user/auth.service';
import { ThreadService } from './thread.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'thread-detail-comments',
    templateUrl: './thread-detail-comments.component.html',
    styleUrls: ['./thread-detail-comments.component.css'],
})

export class ThreadDetailCommentsComponent {
    ///////////
    // objects
    ///////////

    @Input("thre")
    thre = {
        comments : []
    };

    @Input("category") category : string;
    @Input("id") id : string;
    @Input("page") page : string;

    @ViewChild('comment') commentContent : ElementRef;

    // 댓글 입력창
    // 1 - 추가, 2 - 수정, 3 - 대댓
    editPopup : number;
    // 선택된 댓글
    selComment : any;
    // 입력창에 띄울 내용
    modComment : string;

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
    ngOnInit(){
        
        this.modComment = "";
    }
    // 뒤로가기
    goBack(): void {
        //this.location.back();
        this.router.navigate(['/thread/list', this.category, this.page]);
    }
    // 댓글 추가
    addComment() : void {
        let comment = {
            _discussion_id : this.id,
            _parent_id : "-1",
            userid : this.auth.currentUser._id, 
            username : this.auth.currentUser.username, 
            content : this.commentContent.nativeElement.innerHTML,
            create_date : Date.now(),
            update_date : Date.now(),
        };
        console.log(comment);
        const condition = {
            _id : comment._discussion_id, 
            comments : comment
        };
        this.ThreadService.addComment(condition).subscribe(
            res => {
                console.log(res); 
                let recvComment = res.comments;
                comment['_id'] = recvComment._id;
                comment['seq_id'] = recvComment.seq_id;
                this.thre.comments.push(comment);
            },
            error => {console.log(error)},
            () => {
                this.closeModal();
            }
        );
    }
    editComment(): void {
        let condition = {
            _id : this.selComment._discussion_id, // 이 thre의 id를 가진 thre에다가
            comments : {
                _id : this.selComment._id, // 이 id의 comments를 수정하겠다.
                content : this.commentContent.nativeElement.innerHTML, 
                update_date : Date.now()
            }
        };
        this.ThreadService.editComment(condition).subscribe(
            res => {
                console.log(this.selComment._id);
                const pos = this.thre.comments.map(elem => elem._id).indexOf(this.selComment._id);
                this.thre.comments[pos].content = this.commentContent.nativeElement.innerHTML;
            },
            error => {console.log(error)},
            () => {
                this.closeModal();
            }
        );
    }
    commentComment() : void {
        let comment = {
            _discussion_id : this.id,
            _parent_id : this.selComment._id,   // parent_id가 있다.
            userid : this.auth.currentUser._id, 
            username : this.auth.currentUser.username, 
            content : this.commentContent.nativeElement.innerHTML,
            create_date : Date.now(),
            update_date : Date.now(),

            parent_comment : {}, // push 용도
        };
        console.log(comment);
        const condition = {
            _id : comment._discussion_id, 
            comments : comment
        };
        this.ThreadService.addComment(condition).subscribe(
            res => {
                console.log(res); 
                let recvComment = res.comments;
                comment['_id'] = recvComment._id;
                comment['seq_id'] = recvComment.seq_id;
                comment.parent_comment = this.thre.comments.filter(com => com._id === comment._parent_id).pop();
                this.thre.comments.push(comment);
            },
            error => {console.log(error)},
            () => {
                this.closeModal();
            }
        );
    }
    goCommentDelete(comment): void {
        let condition = {
            _id : comment._discussion_id, 
            comments : {
                _id : comment._id, 
                content : comment.content, 
                update_date : Date.now(),
                deleted : true, 
            }
        };
        this.ThreadService.editComment(condition).subscribe(
            res => {
                console.log(comment._id);
                const pos = this.thre.comments.map(elem => elem._id).indexOf(comment._id);
                this.thre.comments[pos].content = "<span style='text-decoration:line-through;'>삭제된 댓글입니다.</span>";

                // 삭제된 댓글은 delete가 true다.
                this.thre.comments[pos]['deleted'] = true;
            },
            error => {console.log(error)},
            () => {
                this.closeModal();
            }
        );
        
    }

    convertMode(mode : number, comment) {
        switch(mode){
            case 1: // new comment
                this.modComment = "";
                break;
            case 2: // edit comment
                this.selComment = comment;
                this.modComment = this.selComment.content;
                break;
            case 3: // comment comment
                this.selComment = comment;
                this.modComment = "";
                break;
            default:
                break;
        }
        console.log(this.selComment);
        this.editPopup = mode;
    }
    closeModal() {
        this.editPopup = 0;
        this.selComment = {};
        this.modComment = "";
        this.commentContent.nativeElement.innerHTML = "";
        console.log("clear " + this.modComment);
    }

}