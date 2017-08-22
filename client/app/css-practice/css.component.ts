import { Component } from '@angular/core'

@Component({
    selector: 'css-practice',
    templateUrl: './css.component.html',
    styleUrls: ['./css.component.css'],
})
export class CssComponent {
    page : number = 2;
    convertpage(num : number){
        this.page = num;
    }
}