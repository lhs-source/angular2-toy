import { Component, ViewChild, ElementRef, Pipe, Renderer2 } from '@angular/core';

@Component({
    selector : "ww",
    templateUrl : "./ww.component.html",
    styleUrls : ["./ww.component.css"],
})
export class WwComponent{
    @ViewChild('editor') editor : ElementRef;

    htmlContent : string;
    isHtml : boolean;

    constructor(private rd: Renderer2){

    }

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
        else if(event.keyCode == 13){
            document.execCommand('insertLineBreak', false);
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
        case 'increaseFontSize':
            document.execCommand('fontSize', false, value + "1");
            break;
        case 'decreaseFontSize':
            document.execCommand('fontSize', false, value + "1");
            break;
        case 'foreColor':
            document.execCommand('foreColor', false, value);
            break;
        case 'removeFormat':
            document.execCommand('removeFormat', false, value);
            break;
        case 'style':
            let style = "border : 1px solid #AAA; border-left : 3px solid #AAA; padding : 6px 8px;";
            //document.designMode = "on";
            console.log(document.getSelection());
            console.log(this.rd);
            console.log(this.editor);
            console.log(this.editor.nativeElement);
            console.log(document.hasFocus());
            var test = document.getSelection().focusNode.parentElement;
            if(document.getSelection().type === "Caret"){
                document.execCommand('insertHTML', false, '<br><div style="' + style + '">입력하세요</div><br>');
            }
            else if(document.getSelection().type === "Range"){
                document.execCommand('formatBlock', false, 'div');
                test.style.cssText = style;
            }
            document.designMode = "off";
            // console.log(test);
            // console.log(test.innerHTML);
            // console.log(test.outerHTML);
            // console.log(test.style);
            // console.log(test.parentElement);
            // console.log(test.classList);
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
