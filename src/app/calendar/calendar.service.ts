import { Injectable } from '@angular/core';
import { CalendarCell } from './calendar-cell.class';
import { monthStringFull, weekofdayStringFull, EndOfThisMonth } from './mock-calendar';


@Injectable()
export class CalendarService{
    getMonthStr(index : number) : string {
        return monthStringFull[index];
    }
    getWeekDayStr(index : number) : string {
        return weekofdayStringFull[index];
    }
    getEndDayNumStr(index : number) : number {
        return EndOfThisMonth[index];
    }
}


















