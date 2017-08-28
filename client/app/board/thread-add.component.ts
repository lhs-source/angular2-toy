import { Component, ViewChild, ElementRef, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Location }                 from '@angular/common';


import { AuthService } from '../user/auth.service';
import { ThreadService } from './thread.service';

@Component({
    selector: 'thread-add',
    templateUrl: './thread-add.component.html',
    styleUrls: ['./thread-add.component.css'],
})

export class ThreadAddComponent implements OnInit {
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
    @ViewChild('content') content : ElementRef;
    
    writeForm: FormGroup;
    
    //////////////
    // contructor
    //////////////

    constructor(private auth: AuthService,
        private formBuilder: FormBuilder,
        private location: Location,
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
        this.category.setValue(this.threServ.category.name);
    }

    ///////////
    // methods
    ///////////

    // 스레 추가
    write() {
        // 스레 오브젝트 생성
        let addthread = {
            username : this.username,
            userid : this.id,
            title : this.title.value,
            category : this.category.value,
            content : this.content.nativeElement.innerHTML,
            create_date : Date.now(),
            update_date : Date.now()
        }
        // 뭔가 이상하면 백
        if(!this.username || !this.id || !this.title.value){
            console.log("invalid");
            return;
        }
        // 추가
        this.threServ.addThread(addthread).subscribe(
            rep => {
                console.log(rep)
            },
            error => {
                console.log(error)
            },
            () => {
                this.goBack();
            }
        )
    }
    // 뒤로가기
    goBack(): void {
        this.location.back();
    }
}