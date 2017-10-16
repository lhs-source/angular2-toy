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
    ///////////
    // objects
    ///////////

    username : string;
    email : string;
    id : string;
    title = new FormControl('', [Validators.required,
        Validators.maxLength(64)]);
    category = new FormControl('', [Validators.required,
        Validators.minLength(1)]);
    
    thre = {};

    @ViewChild('content') content : ElementRef;
    
    writeForm: FormGroup;

    loadComplete = false;
    

    // editor

    editorConfig = {
        editable: true,
        spellcheck: false,
        height: '16rem',
        minHeight: '6rem',
        placeholder: 'Enter text here...',
        translate: 'no'
    };

    htmlContent : string;
    // editor

    //////////////
    // contructor
    //////////////

    constructor(private auth: AuthService,
        private formBuilder: FormBuilder,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private threServ : ThreadService) {
            this.username = auth.currentUser.username;
            this.id = auth.currentUser._id;
         }

    /////////////
    // lifecycle
    /////////////

    ngOnInit() {
        this.writeForm = this.formBuilder.group({
            title : this.title,
            category : this.category,
        });
        // 파라미터 겟
        this.id = this.route.snapshot.paramMap.get('id');
        let condition = {_id : this.id};
        this.threServ.getThread(condition).subscribe(
            thread => {
                this.thre = thread; 
                console.log(this.thre); 
                this.username = thread.username;
                this.email = thread.email;
                this.title.setValue(thread.title);
                //this.content.nativeElement.innerHTML = thread.content;
                this.htmlContent = thread.content;
                console.log(this.htmlContent);

                this.loadComplete = true;
            }
        );
                        
        this.category.setValue(this.threServ.category.name);
        console.log(this.thre);
    }

    ///////////
    // methods
    ///////////

    // 스레 수정
    write() {
        let editthread = {
            _id : this.id,
            title : this.title.value,
            category : this.category.value,
            //content : this.content.nativeElement.innerHTML,
            content : this.htmlContent,
            update_date : Date.now()
        };

        this.threServ.editThread(editthread).subscribe(
            rep => {
                console.log(rep)
            },
            error => {
                console.log(error)
            },
            () => { 
                this.router.navigate(['thread/thread-detail', this.id]); 
            }
        )

    }

    // 뒤로가기
    goBack(): void {
        this.location.back();
    }

    debug() : void {
        this.htmlContent += " plus";
        console.log(this.htmlContent);
    }
}