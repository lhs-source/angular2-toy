import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';


import { ThreadService } from './thread.service';

@Component({
    selector: 'thread-category',
    templateUrl: './thread-category.component.html',
    styleUrls: ['./thread-category.component.css'],
})

export class ThreadCategoryComponent implements OnInit {
    categoryList = [];

    addcategory  = new FormControl('', [Validators.required,
        Validators.maxLength(32)]);

    addForm: FormGroup;

    constructor(
        private threServ : ThreadService,
        private formBuilder: FormBuilder,
        private router: Router,) {
            // override the route reuse strategy
            this.router.routeReuseStrategy.shouldReuseRoute = function(){
                return false;
            }

            this.router.events.subscribe((evt) => {
                if (evt instanceof NavigationEnd) {
                // trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
                // if you need to scroll back to top, here is the right place
                window.scrollTo(0, 0);
                }
            });
    }
    ngOnInit(){
        this.addForm = this.formBuilder.group({
            name : this.addcategory,
        });
        this.threServ.getCategorys().subscribe(
            res => {this.categoryList = res},
            error => {console.log(error)},
            () => {}
        )
    }
    add() {
        this.threServ.addCategory({name : this.addcategory.value}).subscribe(
            res => {console.log(res); this.categoryList.push(res.json())},
            error => console.log(error),
        )
    }
    changeCategory(categoryName : string){
        this.router.navigate(["thread/thread-list", categoryName]);
    }
}