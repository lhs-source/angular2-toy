import { Component } from '@angular/core'


@Component({
    selector: 'thread',
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.css'],
})

export class ThreadComponent {
    toggleCategory : boolean;
    toggle(){
        this.toggleCategory = !this.toggleCategory;
    }
}