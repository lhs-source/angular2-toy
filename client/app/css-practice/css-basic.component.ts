import { Component } from '@angular/core'


const borderStyle : string[] = [
    'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden', 'dotted dashed solid double',
];
@Component({
    selector: 'css-basic',
    templateUrl: './css-basic.component.html',
    styleUrls: ['./css-basic.component.css'],
})

export class CssBasicComponent {
    styles = borderStyle;
    curborderstyle : string;
    
    changestyle(sel : string){
        this.curborderstyle = sel;
    }
}