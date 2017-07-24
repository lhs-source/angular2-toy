import { Component } from '@angular/core';

@Component({
    selector : "calendar-comp",
    templateUrl : "./calendar.component.html",
    styleUrls : ["./calendar.component.css",],
})
export class CalendarComponent{
    // Values
    today : number = Date.now();
    firstDay : number = Date.parse("July 1, 2017");
    lastDay : number = Date.parse("July 31, 2017");
    testdate : Date = new Date();

    day : number;
    month : number;
    year : number;

    // Methods
    refreshTime() : void{
        this.today = Date.now();
        this.testdate = new Date();
        this.day = this.testdate.getDay();
        this.month = this.testdate.getMonth();
        this.year = this.testdate.getFullYear();
        
    }
}