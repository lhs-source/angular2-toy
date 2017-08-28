import { Component } from '@angular/core'


@Component({
    selector: 'thread',
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.css'],
})

export class ThreadComponent {
    ///////////
    // objects
    ///////////

    // 카테고리창 키고 끄기
    toggleCategory : boolean;

    ///////////
    // methods
    ///////////

    // 카테고리창 키고 끄기
    toggle(){
        this.toggleCategory = !this.toggleCategory;
    }
}