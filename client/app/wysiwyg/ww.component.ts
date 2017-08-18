import { Component, ViewChild, ElementRef, Pipe } from '@angular/core';

@Component({
    selector : "ww",
    templateUrl : "./ww.component.html",
    styleUrls : ["./ww.component.css"],
})
export class WwComponent{
    @ViewChild('editor') editor : ElementRef;

    htmlContent : string;

    display() : void {
        this.htmlContent = this.editor.nativeElement.innerHTML;
    }
    event_change(msg : string) : void {
        console.log("event : " + msg);
    }
    command(cmd : string, value : any){
        switch(cmd){
        case "bold":
            document.execCommand('bold', false, null);
            break;
        case "backColor" :
            document.execCommand('backColor', false, "#CCC");
            break;
        case "italic" :
            document.execCommand('italic', false, null);
            break;
        case 'InsertInputCheckbox':
            document.execCommand('InsertInputCheckbox', false, null);
        default :
            break;
        }
    }
}
