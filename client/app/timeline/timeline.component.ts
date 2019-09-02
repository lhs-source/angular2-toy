import { Component, Output, ViewChild } from '@angular/core';
import { CSSTimeline2Component } from './css-timeline.component2';

@Component({
    selector: 'timeline',
    templateUrl : 'timeline.component.html',
    styleUrls : [
        'timeline.component.scss',
    ],
})
export class TimelineComponent{
    selmonth : Date;
    @ViewChild('tl2') tl2 : CSSTimeline2Component;
    // @Output() refreshEvent : Function;

    constructor(){
        this.selmonth = new Date();
    }

    selectMonthCallback(month : string) {
        let selmonthstr = month.split(".");
        this.selmonth.setFullYear(Number.parseInt(selmonthstr[0]), Number.parseInt(selmonthstr[1]), 1);
        console.log(this.selmonth);
        // this.refreshEvent(this.selmonth);
        // this.refreshEvent(this.selmonth);
        this.tl2.refreshEvents(this.selmonth);
    }
    // refreshEvent(e : date){

    // }
	
}