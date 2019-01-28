import { Component, ViewChild, ElementRef, Pipe, Renderer2  } from '@angular/core';
// import { HighlightJsService } from 'angular-highlight-js';


@Component({
    selector : "ww",
    templateUrl : "./ww.component.html",
    styleUrls : [
        "./ww.component.css",
    ]
    
})
export class WwComponent {
    @ViewChild('editor') editor : ElementRef;
    @ViewChild('snippet') syntax_input : ElementRef;

    htmlContent : string;
    isHtml : boolean;
    editorContent : string;

    syntax : string = "int a = 1;";

    // ngx-editor
    editorConfig = {
        editable: true,
        spellcheck: false,
        height: '5rem',
        minHeight: '2rem',
        placeholder: 'Enter text here...',
        translate: 'no'
      };


    // ngx-editor

    constructor(private rd: Renderer2/*, private hlservice : HighlightJsService*/){

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
    event_click() : void{
        let selection = document.getSelection();
        console.log(selection);
        console.log("anchorNode.nodeValue" + selection.anchorNode.nodeValue);
        console.log("anchorNode Offset" + selection.anchorOffset);
        console.log("focusNode.nodeValue" + selection.focusNode.nodeValue);
        console.log("focusNode Offset" + selection.focusOffset);
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
            
            if(document.getSelection().type === "Caret"){
                document.execCommand('insertHTML', false, '<br><div style="' + style + '">입력하세요</div><br>');
            }
            else if(document.getSelection().type === "Range"){
                document.execCommand('formatBlock', false, 'div');
                var test = document.getSelection().focusNode.parentElement;
                test.style.cssText = style;

                let styles = document.createElement("style");
                styles.appendChild(
                    document.createTextNode(".h:hover { background : #444; }")
                );
                document.querySelector("head").appendChild(styles);

                let range = document.getSelection().getRangeAt(0);
                var span = document.createElement("div");
                span.id = "hover";
                span.className = "h";
                span.appendChild( document.createTextNode("hi") );
                range.insertNode(span);
            }
            document.designMode = "off";

            // var sel, range;
            // if (window.getSelection && (sel = window.getSelection()).rangeCount) {
            //     range = sel.getRangeAt(0);
            //     range.collapse(true);
                
            //     var span = document.createElement("div");
            //     span.style.cssText = "border : 1px solid #AAA; border-left : 3px solid #AAA; padding : 6px 8px;";
            //     span.id = "myId";
            //     span.appendChild( document.createTextNode("hi") );
            //     range.insertNode(span);
        
            //     // Move the caret immediately after the inserted span
            //     range.setStartAfter(span);
            //     range.collapse(true);
            //     sel.removeAllRanges();
            //     sel.addRange(range);
            // }
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
    debug(){
        console.log(document.getSelection());
        console.log(this.rd);
        console.log(this.editor);
        console.log(this.editor.nativeElement);
        console.log(document.hasFocus());
    }
    shgo(target: ElementRef){
        // this.hlservice.highlight(target);
        // this.syntax = this.syntax_input.nativeElement.innerText;
    }
}
