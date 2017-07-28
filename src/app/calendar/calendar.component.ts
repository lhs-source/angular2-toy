
import { Component, OnInit } from '@angular/core';

import { CalendarCell } from './calendar-cell.class';
import { CalendarService } from './calendar.service';
import { CalendarEvent } from './calendar-event.class';

@Component({
    selector : "calendar-comp",
    templateUrl : "./calendar.component.html",
    styleUrls : ["./calendar.component.css",],
})

export class CalendarComponent implements OnInit{
    //////////
    // Values
    //////////
    today : number;
    firstDay : number;
    lastDay : number;
    thisDate : Date;

    // Date Class
    // getDate : day
    // getDay : week of day
    // getMonth : month
    // getFullYear : year
    // 

    day : number;
    month : number;
    monthStr : string;
    year : number;
    weekofday : number;
    weekofdayStr : string;
    timezone : number;
    timezoneoffset : number;

    thismonthFirst : Date;
    thismonthLast : Date;
    endofthismonth : number;

    selectedIndex : number;

    cells : CalendarCell[] = [];
    selectedCell : CalendarCell;

    calendarEvents : CalendarEvent[];

    // 이벤트 추가
    addEventDate : string;
    addEventNote : string;

    constructor(private calServ : CalendarService){

    }
    ///////////
    // Methods
    ///////////

    // 현재 달을 바꾼다.
    refreshTime() : void{
        this.today = Date.now();
        // 값들 설정
        this.day = this.thisDate.getDate();
        this.month = this.thisDate.getMonth();
        this.monthStr = this.calServ.getMonthStr(this.month); //monthStringFull[this.month];
        this.year = this.thisDate.getFullYear();
        this.weekofday = this.thisDate.getDay();
        this.weekofdayStr = this.calServ.getWeekDayStr(this.weekofday);//weekofdayStringFull[this.weekofday];
        this.timezone = this.thisDate.getTime();
        this.timezoneoffset = this.thisDate.getTimezoneOffset();

        // 이달의 마지막 날짜의 숫자 30? 31? 28?
        this.endofthismonth = this.calServ.getEndDayNumStr(this.month);//EOTD[this.month];
        // 윤년
        if(this.year % 4 === 0 && this.month === 1){
            this.endofthismonth++;
        }
        // 이달의 첫날
        this.thismonthFirst.setFullYear(this.year, this.month, 1);
        // 이달의 마지막날
        this.thismonthLast.setFullYear(this.year, this.month, this.endofthismonth);

        // 첫날, 마지막날 요일
        var startDay = this.thismonthFirst.getDay();
        var LastDay = this.thismonthLast.getDay();
        
        this.setCalendarCells(this.thisDate, startDay, LastDay);
    }
    // 셀에 날짜와 속성들을 설정한다.
    // 달이 바뀌거나, 선택한 셀이 바뀔 때 달력을 재출력하기 위함
    setCalendarCells(thisMonth : Date, startDay : number, LastDay : number){
        var start;

        var date = thisMonth.getDate();
        var month = thisMonth.getMonth();
        var year = thisMonth.getFullYear();

        // var selDate = this.selectedCell.date.getDate();
        // var selMonth = this.selectedCell.date.getMonth();
        // var selYear = this.selectedCell.date.getFullYear();

        this.unsetCellsProperties();

        // 저번달
        if(startDay === 0){ 
            // 시작이 일요일이면 한줄 추가
            startDay += 7;
        }
        for(var i = 0; i < startDay; i++){
            this.cells[i].date.setFullYear(year, month, - (startDay - i) + 1);
        }
        // 이번달
        for(var i = 0; i < this.endofthismonth; i++){
            start = i + startDay;

            this.cells[start].date.setFullYear(year, month, i + 1);
            this.cells[start].isThisMonth = true;

            if(this.selectedCell.date.getFullYear() === this.cells[start].date.getFullYear() &&
               this.selectedCell.date.getMonth() === this.cells[start].date.getMonth() &&
               this.selectedCell.date.getDate() === this.cells[start].date.getDate() ){
                   // selectedCell과 cells[start]가 같은 곳을 가리키고 있기 때문에
                this.selectedCell = this.cells[start];
                this.selectedCell.isClicked = true;
            }
        }
        // 다음달
        if(LastDay === 6){
            // 마지막날이 토요일이면 막줄 추가
            LastDay -= 7;
        }
        if(this.endofthismonth + startDay < 35){
            // 6줄을 맞추자
            LastDay -= 7;
        }
        for(var i = 0; i < 6 - LastDay; i++){
            start = i + this.endofthismonth + startDay;
            this.cells[start].date.setFullYear(year, month + 1, i + 1);
        }
        this.markEvents();        
    }
    // 이벤트 목록과 cell과 매핑시킨다.
    markEvents() : void{
        var temp;
        var thisMonthEvents = this.calendarEvents.filter(
            event => event.getTimeCode(true, true, false) === this.cells[20].getTimeCode(true, true, false) );
        var eventsLen = thisMonthEvents.length;

        this.unsetCellsProperties(true);

        if(42 < eventsLen){
            // 이벤트가 42개가 넘는다.
            for(var i = 0; i < 42; i++){
                if( (temp = thisMonthEvents.filter(event => event.getTimeCode() === this.cells[i].getTimeCode())) ){
                    temp.forEach(event => {
                        this.cells[i].calendarEvents.push(event);
                        //console.log("find " + event.date);
                    });
                }
            }
        }
        else{
            // 이벤트가 42개보단 작다.
            for(var i = 0; i < eventsLen; i++){
                if( (temp = this.cells.filter(cell => cell.getTimeCode() === thisMonthEvents[i].getTimeCode())) ){
                    temp.forEach(cell => {
                        cell.calendarEvents.push(thisMonthEvents[i]);
                        //console.log("find " + cell.date);
                    });
                }
            }
        }
    }
    // 셀들의 속성들을 초기화한다.
    unsetCellsProperties(onlyEvents : boolean = false) : void {
        for(var i = 0; i < 42; i++){
            if(!onlyEvents){
                this.cells[i].isThisMonth = false;
                this.cells[i].isClicked = false;
            }
            this.cells[i].calendarEvents = [];
        }
    }
    ngOnInit() : void{
        // instance 초기화
        this.today = Date.now();
        this.thisDate = new Date();
        this.thismonthFirst = new Date();
        this.thismonthLast = new Date();
        this.selectedCell = new CalendarCell(Date.now());

        // 날짜 설정
        this.thisDate.setTime(this.today);
        this.thisDate.setMonth(6);

        for(var i = 0; i < 42; i++){
            this.cells[i] = new CalendarCell(0, false);
        }
        this.calendarEvents = [
            new CalendarEvent(Date.now(), "Today!!"),
            new CalendarEvent(Date.now(), "Today!!2"),
            new CalendarEvent(Date.now(), "Today!!3"),
            new CalendarEvent(Date.now(), "Tomorrow"),
        ];
        this.calendarEvents[3].date.setDate(this.calendarEvents[3].date.getDate() + 1);
        this.addEventDate = this.thisDate.getFullYear() + "-" + (this.thisDate.getMonth() + 1) + "-" + this.thisDate.getDate();

        this.refreshTime();
    }
    click_Cell(index : number) : void {
        if(this.cells[index].date.getMonth() === this.month){
            this.selectedCell.isClicked = false;
            this.selectedCell = this.cells[index];
            this.selectedCell.isClicked = true;
            // 추가할 이벤트 폼 날짜 동기화
            this.addEventDate = this.selectedCell.date.getFullYear() + "-" + (this.selectedCell.date.getMonth() + 1) + "-" + this.selectedCell.date.getDate();
        }
        else{
            this.thisDate.setFullYear(this.cells[index].date.getFullYear(), this.cells[index].date.getMonth(), this.cells[index].date.getDate());
            // selectedCell이 this.cells[index]를 가리키고 있어서, 
            // this.cells를 바꾸면 따라 바뀌니 새로운 인스턴스로 분리
            this.selectedCell = new CalendarCell(this.selectedCell.date.getTime());
            this.refreshTime();
        }
        //this.today = this.thisDate.getTime();
    }
    click_Today() : void{
        this.thisDate.setTime(Date.now());
        //this.selectedCell.date.setTime(this.thisDate.getTime());
        this.selectedCell = new CalendarCell(this.today);
        this.refreshTime();
    }
    click_Prev() : void{
        this.thisDate.setMonth(this.month - 1);
        this.selectedCell = new CalendarCell(this.selectedCell.date.getTime());
        this.refreshTime();
    }
    click_Next() : void{
        this.thisDate.setMonth(this.month + 1);
        this.selectedCell = new CalendarCell(this.selectedCell.date.getTime());
        this.refreshTime();
    }
    click_AddEvent() : void{
        this.calendarEvents.push(
            new CalendarEvent(new Date(this.addEventDate).getTime(), this.addEventNote)
        );
        //console.log(this.calendarEvents.length + " last : " );
        this.markEvents();
    }
    click_Debug(){
        this.selectedCell.calendarEvents.forEach(
            event => {
                var len = event.note.length;
                var chararray = new Array();
                var count = 0;
                for(var i = 0; i < len; i++){
                    chararray[i] = event.note.charAt(i);
                    count += chararray[i] === "\n" ? 1 : 0;
                }                
                console.log(count);
                console.log(event.note.includes("\n"));
            }
        )
    }
    // textareaAutoGrow() : void {
    //     var textArae
    // }
}