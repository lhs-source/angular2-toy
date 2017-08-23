import { Component, ViewChild, ElementRef, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


import { AuthService } from '../user/auth.service';
import { ThreadService } from './thread.service';

@Component({
    selector: 'thread-add',
    templateUrl: './thread-add.component.html',
    styleUrls: ['./thread-add.component.css'],
})

export class ThreadAddComponent implements OnInit {
    username : string;
    email : string;
    id : string;
    title = new FormControl('', [Validators.required,
        Validators.minLength(4)]);
    @ViewChild('content') content : ElementRef;
    
    writeForm: FormGroup;

    constructor(private auth: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private threServ : ThreadService) {
            this.username = auth.currentUser.username;
            this.id = auth.currentUser._id;
         }

    ngOnInit() {
        this.writeForm = this.formBuilder.group({
            title : this.title,
        });
    }

    write() {
        console.log("username : " + this.username);
        console.log("email : " + this.email);
        console.log("id : " + this.id);
        console.log("title : " + this.title.value);
        console.log("content : " + this.content.nativeElement.innerText);
        console.log(" ");
        console.log("date : " + Date.now());

        this.threServ.addThread({
            username : this.username,
            userid : this.id,
            title : this.title.value,
            content : this.content.nativeElement.innerHTML,
            create_date : Date.now(),
            update_date : Date.now()
        }).subscribe(
            rep => {console.log(rep)},
            error => {console.log(error)},
            () => {this.router.navigate(['thread/thread-list']);}
        )

    }
}