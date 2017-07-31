import { Component, Input } from '@angular/core';

import { CalendarService } from './calendar.service';
import { CalendarEvent } from './calendar-event.class';

@Component({
    selector : 'event-control',
    templateUrl : './calendar-event.component.html',
    styleUrls : ['./calendar-event.component.css'],
})
export class CalendarEventComponent{
    //////////////////
    // 콜백함수들이다.
    //////////////////
    @Input() addCallback : Function;
    @Input() updateCallback : Function;
    @Input() deleteCallback : Function;

    // 선택된 셀의 이벤트와 날짜 string이다.
    @Input() selectedCell : CalendarEvent[];
    @Input() selectedDate : string;

    // 이벤트 추가용 변수다.
    @Input() addEventDate : string;
    addEventNote : string;

    // 서비스
    constructor(private calServ : CalendarService){ }

    // debug용 버튼이다.
    click_Debug(){
        console.log(this.selectedCell);
    }
    // addEventDate, addEventNote로 이벤트를 db에 add한다.
    click_AddEvent() : void{
        this.db_addEvents();
    }
    // textarea에 있는 내용으로 이벤트를 db에 update한다.
    click_Edit(event : CalendarEvent){
        this.db_updateEvents(event);
    }
    // 이벤트를 삭제한다.
    click_Del(event : CalendarEvent){
        this.db_deleteEvents(event);
    }
    // db에 이벤트를 add한다.
    // 다 끝내고 addCallback을 호출한다.
    db_addEvents(){
        console.log(this.addEventDate + " " + this.addEventNote);
        this.calServ.addEvent({date : this.addEventDate, note : this.addEventNote}).subscribe(
            res => {
                const calendarEvent = res.json();
                this.addCallback(new CalendarEvent(new Date(calendarEvent.date).getTime(), calendarEvent.note, calendarEvent._id));
                console.log("Add Success");
            },
            error => console.log(error)
        );
    }
    // db에 이벤트를 update한다.
    // 다 끝내고 updateCallback을 호출한다.
    db_updateEvents(event : CalendarEvent){
        this.calServ.editEvent(event).subscribe(
            res => {
                console.log("Update Success?");
                this.updateCallback();
                //this.toast.setMessage('item edited successfully.', 'success');
            },
            error => console.log(error)
        )
    }
    // db에 이벤트를 delete한다.
    // 다 끝내고 deleteEvent을 호출한다.
    db_deleteEvents(event : CalendarEvent){
        this.calServ.deleteEvent(event).subscribe(
            res => {
                this.deleteCallback(event);
                console.log("Delete Success");
            },
            error => console.log(error)
        )
    }
}