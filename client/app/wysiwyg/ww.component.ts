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

    // toolbars
    bold() : void{
        document.execCommand('bold', false, null);
    }

    
    backColor() : void{
        document.execCommand('backColor', false, "#CCC");
    }
}
