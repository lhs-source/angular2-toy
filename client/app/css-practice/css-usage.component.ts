import { Component } from '@angular/core';

@Component({
    selector: 'css-usage',
    templateUrl : 'css-usage.component.html',
    styleUrls : [
        'css-usage.component.css',
    ],
})
export class CSSUsageComponent{
    isFontdrop : boolean = false;
    selsize : number = 10;


    fontdrop(){
        console.log("press");
        this.isFontdrop = !this.isFontdrop;
        console.log(this.isFontdrop);
    }
    selSize(arg1 : number){
        //document.execCommand('styleWithCss');
        //document.execCommand('fontSize', false, arg1 / 2);
        let sel = document.getSelection();
        console.log(sel);

        this.selsize = arg1;
    }
}