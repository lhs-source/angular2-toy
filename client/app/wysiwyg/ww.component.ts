import { Component, ViewChild, ElementRef, Pipe } from '@angular/core';

@Component({
    selector : "ww",
    templateUrl : "./ww.component.html",
    styleUrls : ["./ww.component.css"],
})
export class WwComponent{
    @ViewChild('editor') editor : ElementRef;

    htmlContent : string;
    isHtml : boolean;

    display() : void {
        this.htmlContent = this.editor.nativeElement.innerHTML;
    }
    event_keydown(event : any) : void {
        //console.log("event : " + msg);
        if(event.keyCode === 9){
            document.execCommand('insertHTML', false, '&#009');
            // 다음 엘리먼트로 포커스 옮기는 거 방지
            event.preventDefault();
        }
    }
    command(cmd : string, value : any){
        console.log(cmd + ", " + value);
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
        case 'insertUnorderedList':
            document.execCommand('insertUnorderedList', false, null);
            break;
        case 'formatBlock':
            document.execCommand('formatBlock', false, value);
            break;
        case 'fontSize':
            document.execCommand('fontSize', false, value + "1");
            break;
        case 'foreColor':
            document.execCommand('foreColor', false, value);
            break;
        case 'removeFormat':
            document.execCommand('removeFormat', false, value);
            break;
        case 'style':
            document.designMode = "on";
            document.execCommand('formatBlock', false, 'div');
            var test = document.getSelection().focusNode.parentElement;
            test.className = "test";
            //$(test).addClass('test');
            console.log(test);
            console.log(test.classList);
            document.designMode = "off";
            break;
        default :
            break;
        }
    }
    viewHtml() {
        this.isHtml = !this.isHtml;
        if(this.isHtml){
            this.editor.nativeElement.innerText = this.editor.nativeElement.innerHTML;
        }
        else{
            this.editor.nativeElement.innerHTML = this.editor.nativeElement.innerText;
        }
    }
}
