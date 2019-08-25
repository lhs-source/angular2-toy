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
    selEvent : CalendarEvent;
    addEventTitle : string;
    addEventNote : string;
    addEventLoc : string;
    addEventPic : string;

    files : string[];
    srcurl : string = 'http://localhost:3000/uploads';

    // 서비스
    constructor(private calServ : CalendarService){
        this.files = [];

     }

    // debug용 버튼이다.
    click_Debug(){
        console.log(this.selectedCell);
        console.log(this.files);
    }
    // addEventDate, addEventNote로 이벤트를 db에 add한다.
    click_AddEvent() : void{
        this.db_addEvents();
    }
    click_EditEvent() : void {
        this.selEvent.title = this.addEventTitle;
        this.selEvent.note = this.addEventNote;
        this.selEvent.loc = [this.addEventLoc];
        this.selEvent.pic = this.files;

        console.log(this.selEvent);
        this.db_updateEvents(this.selEvent);
    }
    // textarea에 있는 내용으로 이벤트를 db에 update한다.
    click_Edit(event : CalendarEvent){
        this.selEvent = event;
        
        this.addEventNote = event.note;
        this.addEventTitle = event.title;
        this.addEventLoc = event.loc[0];
        this.files = event.pic;
    }
    // 이벤트를 삭제한다.
    click_Del(event : CalendarEvent){
        this.db_deleteEvents(event);
    }
    // db에 이벤트를 add한다.
    // 다 끝내고 addCallback을 호출한다.
    db_addEvents(){
        let event = {
            date : this.addEventDate, 
            title : this.addEventTitle,
            note : this.addEventNote,
            loc : [this.addEventLoc,],
            pic : [this.files,]
        };
        console.log(event);
        this.calServ.addEvent(event).subscribe(
            res => {
                const calendarEvent = res.json();
                this.addCallback(
                    new CalendarEvent(
                        new Date(calendarEvent.date).getTime(), 
                        calendarEvent.note,
                        calendarEvent.title,
                        calendarEvent.loc,
                        calendarEvent.pic,
                        calendarEvent._id));
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

    fileuploaded(event){
        console.log(event);
        this.files.push(event.filename);
        console.log(this.files);
    }

}