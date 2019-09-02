import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar/calendar.service';
import { CalendarEvent } from '../calendar/calendar-event.class';

@Component({
    selector: 'css-timeline2',
    templateUrl : 'css-timeline.component2.html',
    styleUrls : [
        'css-timeline.component2.scss',
    ],
})
export class CSSTimeline2Component{
    events : CalendarEvent[];


    constructor(private calServ : CalendarService){

    }

    ngOnInit(){
        this.calServ.getEventsByConditions({year : 2019, month : 8}).subscribe(
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