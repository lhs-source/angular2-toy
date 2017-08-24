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

    thre = {};
    id : string;
    comments = [];

    @ViewChild('comment') commentContent : ElementRef;

    editPopup : number;
    selComment : any;
    modComment : string;

    constructor(
        private ThreadService: ThreadService,
        private route: ActivatedRoute,
        private location: Location,
        private router : Router,
        private auth: AuthService,
      ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.ThreadService.getThread({_id : this.id})
                            .subscribe(thread => {
                                this.thre = thread;
                            });
        
        this.ThreadService.getComments({_discussion_id : this.id})
                            .subscribe(comments => {
                                this.comments = comments; 
                            });

        this.modComment = "";
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
            res => {console.log(res.json());},
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
            update_date : Date.now()
        };
        console.log(comment);
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
    }
    editComment(): void {
        //this.selComment = this.commentContent.nativeElement.innerHTML,
        this.ThreadService.editComment({_id : this.selComment._id, content : this.commentContent.nativeElement.innerHTML}).subscribe(
            res => {
                console.log(this.selComment._id);
                const pos = this.comments.map(elem => elem._id).indexOf(this.selComment._id);
                this.comments[pos].content = this.commentContent.nativeElement.innerHTML;
            },
            error => {console.log(error)},
            () => {
                this.closeModal();
            }
        );
    }
    goCommentDelete(comment): void {
        this.ThreadService.deleteComment({_id : comment._id}).subscribe(
            res => {
                const pos = this.comments.map(elem => elem._id).indexOf(comment._id);
                this.comments.splice(pos, 1);
            },
            error => {console.log(error)},
            () => {}
        );
    }

    convertMode(mode : number, comment) {
        switch(mode){
            case 1: // new comment
                break;
            case 2: // edit comment
                this.selComment = comment;
                this.modComment = this.selComment.content;
                break;
            case 3: // comment comment
                this.selComment = comment;
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
    }

}