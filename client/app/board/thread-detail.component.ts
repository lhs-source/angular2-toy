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

    thre = {
        comments : []
    };
    id : string;
    comments = [];

    @ViewChild('comment') commentContent : ElementRef;

    editPopup : number;
    selComment : any;
    modComment : string;

    parenthtmlformat1 : string;
    parenthtmlformat2 : string;

    constructor(
        private ThreadService: ThreadService,
        private route: ActivatedRoute,
        private location: Location,
        private router : Router,
        private auth: AuthService,
      ) {}

    ngOnInit(): void {
        this.modComment = "";
        this.parenthtmlformat1 = "<div style='margin : 8px 0; padding : 4px; border : 1px solid #CCC; border-radius : 4px;'>"; 
        this.parenthtmlformat2 = "</div>";

        this.id = this.route.snapshot.paramMap.get('id');
        this.ThreadService.getThread({_id : this.id})
                            .subscribe(thread => {
                                this.thre = thread;
                                console.log(this.thre);
                                this.thre.comments.forEach(
                                    entry => {
                                        if(entry._parent_id != '-1'){
                                            entry.parent_comment = this.thre.comments.filter(com => com._id === entry._parent_id).pop();
                                            console.log(entry.parent_comment);
                                        }
                                    }
                                );
                            });
        /*
        this.ThreadService.getComments({_discussion_id : this.id})
                            .subscribe(comments => {
                                this.comments = comments; 
                                this.comments.forEach(com =>{
                                    if(com._parent_id != '-1'){
                                        this.ThreadService.getComment({_id : com._parent_id}).subscribe(
                                            parent => {
                                                com['parent_comment'] = parent; 
                                                
                                                //com.content = this.parenthtmlformat1 + parent.content + this.parenthtmlformat2;
                                            },
                                        )
                                    }
                                });
                                console.log(JSON.stringify(comments));
                            });
        */

    }

    goBack(): void {
        //this.location.back();
        this.router.navigate(['/thread/thread-list']);
    }
    // thread modify
    goEdit(): void {
        this.router.navigate(['/thread/thread-edit', this.id]);
    }
    goDelete(): void {
        this.ThreadService.deleteThread({_id : this.id}).subscribe(
            res => {console.log(res);},
            error => {console.log(error)},
            () => {}
        );
        this.router.navigate(['/thread/thread-list']);
    }

    // comment modify
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
        console.log(JSON.stringify(comment));
        console.log(comment);
        this.ThreadService.addComment({_id : comment._discussion_id, comments : comment}).subscribe(
            res => {
                console.log(res); 
                comment['_id'] = res.comments.pop()._id;
                this.thre.comments.push(comment);
            },
            error => {console.log(error)},
            () => {
                this.closeModal();
            }
        );
        /*
        this.ThreadService.addComment(comment).subscribe(
            res => {
                console.log(res.json()); 
                this.comments.push(res.json());
            },
            error => {console.log(error)},
            () => {
                this.closeModal();
            }
        );
        */
    }
    editComment(): void {
        //this.selComment = this.commentContent.nativeElement.innerHTML,
        this.ThreadService.editComment({_id : this.selComment._discussion_id, comments : {_id : this.selComment._id, content : this.commentContent.nativeElement.innerHTML, update_date : Date.now()}}).subscribe(
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
        console.log(JSON.stringify(comment));
        this.ThreadService.addComment({_id : comment._discussion_id, comments : comment}).subscribe(
            res => {
                console.log(res); 
                comment.parent_comment = this.thre.comments.filter(com => com._id === comment._parent_id).pop();
                console.log(comment.parent_comment);
                this.thre.comments.push(comment);
                console.log("ok"); 
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
        
        this.ThreadService.editComment({_id : comment._discussion_id, comments : {_id : comment._id, content : comment.content, deleted : true, update_date : Date.now()}}).subscribe(
            res => {
                console.log(comment._id);
                const pos = this.thre.comments.map(elem => elem._id).indexOf(comment._id);
                this.thre.comments[pos].content = "삭제된 댓글입니다.";
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