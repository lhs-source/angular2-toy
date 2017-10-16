import { Component, ViewChild, ViewChildren, ElementRef, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
      ) {}

    /////////////
    // lifecycle
    /////////////

    ngOnInit(): void {
        this.modComment = "";

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

    ////////// 댓글 //////////

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
            _id : this.selComment._discussion_id, 
            comments : {
                _id : this.selComment._id, 
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
            _parent_id : this.selComment._id,
            userid : this.auth.currentUser._id, 
            username : this.auth.currentUser.username, 
            content : this.commentContent.nativeElement.innerHTML,
            create_date : Date.now(),
            update_date : Date.now(),
            parent_comment : {},
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
        //  pull로 아예 삭제
        /*
        this.ThreadService.deleteComment({_id : comment._discussion_id, comments : {_id : comment._id}}).subscribe(
            res => {
                console.log(res);
                const pos = this.thre.comments.map(elem => elem._id).indexOf(comment._id);
                console.log(pos);
                this.thre.comments.splice(pos, 1);
            },
            error => {console.log(error)},
            () => {}
        );
        */
        // mongoose에서는 pull 해도 null로 바뀌어서 
        // 삭제되었습니다. 로 바꾸는 방안...
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