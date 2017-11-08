
import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-nav',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent{
    @Input('toggle') isNavActive : boolean = false;




}