import { Injectable } from '@angular/core';
import { CalendarCell } from './calendar-cell.class';
import { monthStringFull, weekofdayStringFull_Kor, EndOfThisMonth } from './mock-calendar';

import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CalendarService{
    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http : Http) { }

    //////////////////////////
    // mock 에서 상수 가져오기
    //////////////////////////
    getMonthStr(index : number) : string {
        return monthStringFull[index];
    }
    getWeekDayStr(index : number) : string {
        return weekofdayStringFull_Kor[index];
    }
    getEndDayNumStr(index : number) : number {
        return EndOfThisMonth[index];
    }

    /////////////////////////
    // REST API로 데이터 제어
    /////////////////////////
    getEvents(): Observable<any> {
        return this.http.get('/api/events').map(res => res.json());
    }
    
    getEventsByConditions(condition): Observable<any> {
        //  condition {
        //      year,
        //      toyear,
        //      month
        //      tomonth,
        //  }
        console.log(condition);
        return this.http.post('/api/events', condition).map(res => res.json());
    }

    countEvents(): Observable<any> {
        return this.http.get('/api/events/count').map(res => res.json());
    }

    addEvent(event): Observable<any> {
        return this.http.post('/api/event', JSON.stringify(event), this.options);
    }

    getEvent(event): Observable<any> {
        return this.http.get(`/api/event/${event._id}`).map(res => res.json());
    }

    editEvent(event): Observable<any> {
        return this.http.put(`/api/event/${event._id}`, JSON.stringify(event), this.options);
    }

    deleteEvent(event): Observable<any> {
        return this.http.delete(`/api/event/${event._id}`, this.options);
    }
}


















