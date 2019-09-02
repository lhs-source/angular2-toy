import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarService } from '../calendar/calendar.service';
import { CalendarEvent } from '../calendar/calendar-event.class';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
  } from '@angular/animations';

@Component({
    selector: 'css-timeline2',
    templateUrl : 'css-timeline.component2.html',
    styleUrls : [
        'css-timeline.component2.scss',
    ],
})
export class CSSTimeline2Component{
    events : CalendarEvent[];
    @Input() selMonth : Date;
    @Output() parentCall : EventEmitter<Date>;


    constructor(private calServ : CalendarService){
        this.parentCall = new EventEmitter<Date>();
        this.selMonth = new Date();
    }

    ngOnInit(){
        let condition = {
            year : 2019, 
            toyear : 2019,
            month : 8,
            tomonth : 9
        };
        this.calServ.getEventsByConditions(condition).subscribe(
            data =>{ 
                console.log('returned data --');
                this.events = data;
                console.log(this.events);
            },
            error => {},
            () => {/*complete*/}
        )
    }
	refreshEvents(selmonth : Date) {
        let condition = {
            year : selmonth.getFullYear(), 
            toyear : selmonth.getFullYear(),
            month : selmonth.getMonth(),
            tomonth : selmonth.getMonth() + 1
        };
        this.calServ.getEventsByConditions(condition).subscribe(
            data =>{ 
                console.log('returned data --');
                this.events = data;
                console.log(this.events);
            },
            error => {},
            () => {/*complete*/}
        )
    }
}