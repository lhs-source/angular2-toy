import { Component } from '@angular/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent{
    version : number = 0.104;
    isNavActive : boolean = false;
    toggleNav() : void{
        this.isNavActive = !this.isNavActive;
    }
}