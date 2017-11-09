import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy{
    version : number = 0.104;
    isNavActive : boolean = false;
    toggleNav() : void{
        this.isNavActive = !this.isNavActive;
    }

    ngOnInit() {
        console.log("Component : app(onInit)");
    }
    ngOnDestroy(){
        console.log("Component : app(onDestroy)");
    }
    changeNavActive(){
        
    }
}