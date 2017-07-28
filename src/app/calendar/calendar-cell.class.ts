
import { CalendarEvent } from './calendar-event.class';

/////////
// cells
/////////
export class CalendarCell{
    date : Date;
    isThisMonth : boolean;
    isClicked : boolean;
    calendarEvents : CalendarEvent[];

    constructor(datenumber? : number, thismonth? : boolean){
        this.date = new Date();
        if(datenumber){
            this.date.setTime(datenumber);
        }
        this.isThisMonth = thismonth ? thismonth : false;
        this.isClicked = false;
        this.calendarEvents = [];
    }
    
    getTimeCode(year : boolean = true, month : boolean = true, date : boolean = true) : number {
        var value = 0;
        value += year ? this.date.getFullYear() * 10000 : 0;
        value += month ? this.date.getMonth() * 100: 0;
        value += date ? this.date.getDate() : 0;
        return value;
    }
}