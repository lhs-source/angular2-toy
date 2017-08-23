import { Component, ViewChild, ElementRef, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';


import { AuthService } from '../user/auth.service';
import { ThreadService } from './thread.service';

@Component({
    selector: 'thread-edit',
    templateUrl: './thread-edit.component.html',
    styleUrls: ['./thread-edit.component.css'],
})

export class ThreadEditComponent implements OnInit {
    username : string;
    email : string;
    id : string;
    title = new FormControl('', [Validators.required,
        Validators.minLength(4)]);
    
    thre = {};

    @ViewChild('content') content : ElementRef;
    
    writeForm: FormGroup;

    constructor(private auth: AuthService,
        private formBuilder: FormBuilder,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private threServ : ThreadService) {
            this.username = auth.currentUser.username;
            this.id = auth.currentUser._id;
         }

    ngOnInit() {
        this.writeForm = this.formBuilder.group({
            title : this.title,
        });
        this.id = this.route.snapshot.paramMap.get('id');
        this.threServ.getThread({_id : this.id})
                            .subscribe(thread => {
                                this.thre = thread; 
                                console.log(this.thre); 
                                this.username = thread.username;
                                this.email = thread.email;
                                this.title.setValue(thread.title);
                                this.content.nativeElement.innerHTML = thread.content;
                            }
                        );
        console.log(this.thre);
    }

    write() {
        console.log("username : " + this.username);
        console.log("email : " + this.email);
        console.log("id : " + this.id);
        console.log("title : " + this.title.value);
        console.log("content : " + this.content.nativeElement.innerText);
        console.log(" ");
        console.log("date : " + Date.now());

        this.threServ.editThread({
            _id : this.id,
            username : this.username,
            userid : this.id,
            title : this.title.value,
            content : this.content.nativeElement.innerHTML,
            create_date : Date.now(),
            update_date : Date.now()
        }).subscribe(
            rep => {console.log(rep)},
            error => {console.log(error)},
            () => { this.router.navigate(['thread/thread-detail', this.id]); }
        )

    }

    goBack(): void {
        this.location.back();
    }
}