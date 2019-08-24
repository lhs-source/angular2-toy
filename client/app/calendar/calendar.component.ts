
import { Component, OnInit } from '@angular/core';

import { CalendarCell } from './calendar-cell.class';
import { CalendarService } from './calendar.service';
import { CalendarEvent } from './calendar-event.class';

import 'rxjs/add/operator/map';

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

    /**
     * Date Class
     * getDate : day
     * getDay : week of day
     * getMonth : month
     * getFullYear : year
     */

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

    // 선택된 셀의 인덱스
    selectedIndex : number;

    // 달력의 모든 셀
    cells : CalendarCell[] = [];
    // 선택된 셀
    selectedCell : CalendarCell;
    // 모든 이벤트
    calendarEvents : CalendarEvent[] = [];

    // 이벤트 추가용 변수
    addEventDate : string;
    addEventNote : string;

    // calendar 서비스
    constructor(private calServ : CalendarService){

    }
    // db 테스트
    eventsFromDB : any = [];
    // 디비로부터 데이터 로드가 됐는지
    isLoaded : boolean = false;

    // 그냥 테스트용
    num1 : number;


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
        //console.log(this.calendarEvents);
        var thisMonthEvents = this.calendarEvents.filter(
            event => event.getTimeCode(true, true, false) === this.cells[20].getTimeCode(true, true, false) );
        var eventsLen = thisMonthEvents.length;
            //console.log(thisMonthEvents);
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
        //this.thisDate.setMonth(6);

        // 이벤트 테스트
        for(var i = 0; i < 42; i++){
            this.cells[i] = new CalendarCell(0, false);
        }
        // this.calendarEvents = [
        //     new CalendarEvent(Date.now(), "Today!!"),
        //     new CalendarEvent(Date.now(), "Tomorrow"),
        // ];
        // this.calendarEvents[1].date.setDate(this.calendarEvents[1].date.getDate() + 1);
        this.addEventDate = this.thisDate.getFullYear() + "-" + (this.thisDate.getMonth() + 1) + "-" + this.thisDate.getDate();

        this.timer();

        this.db_getEvents();
    }
    // 셀을 클릭했을 때
    click_Cell(index : number) : void {
        if(this.cells[index].date.getMonth() === this.month){
            // 이번달이다.
            this.selectedCell.isClicked = false;
            this.selectedCell = this.cells[index];
            this.selectedCell.isClicked = true;
            // 추가할 이벤트 폼 날짜 동기화
            this.addEventDate = this.selectedCell.date.getFullYear() + "-" + (this.selectedCell.date.getMonth() + 1) + "-" + this.selectedCell.date.getDate();
        }
        else{
            // 저번달이나, 다음달이다.
            this.thisDate.setFullYear(this.cells[index].date.getFullYear(), this.cells[index].date.getMonth(), this.cells[index].date.getDate());
            // selectedCell이 this.cells[index]를 가리키고 있어서, 
            // this.cells를 바꾸면 따라 바뀌니 새로운 인스턴스로 분리
            this.selectedCell = new CalendarCell(this.selectedCell.date.getTime());
            this.refreshTime();
        }
        //this.today = this.thisDate.getTime();
    }
    // 오늘로 이동한다.
    click_Today() : void{
        this.thisDate.setTime(Date.now());
        //this.selectedCell.date.setTime(this.thisDate.getTime());
        this.selectedCell = new CalendarCell(this.today);
        this.refreshTime();
    }
    // 이전달로 이동한다.
    click_Prev() : void{
        this.thisDate.setMonth(this.month - 1);
        this.selectedCell = new CalendarCell(this.selectedCell.date.getTime());
        this.refreshTime();
    }
    // 다음달로 이동한다.
    click_Next() : void{
        this.thisDate.setMonth(this.month + 1);
        this.selectedCell = new CalendarCell(this.selectedCell.date.getTime());
        this.refreshTime();
    }
    // db로부터 이벤트를 가져온다.
    // 가져와서 calendarEvents에 push한다.
    // 로드가 됐으니 isLoaded는 true로 바꾼다.
    // 그리고 시간을 갱신한다.
    db_getEvents(){
        this.calServ.getEvents().subscribe(
            data => { this.eventsFromDB = data;},
            error => console.log(error),
            () => {
                var len = this.eventsFromDB.length;
                var len2 = this.calendarEvents.length;
                for(var i = 0; i < len; i++){
                    this.calendarEvents[len2 + i] 
                    = new CalendarEvent(
                        this.eventsFromDB[i].date, 
                        this.eventsFromDB[i].note, 
                        this.eventsFromDB[i].title,
                        this.eventsFromDB[i].loc,
                        this.eventsFromDB[i].pic,
                        this.eventsFromDB[i]._id);
                }
                this.isLoaded = true;
                //console.log("Get Events from mongoDB " + this.calendarEvents.length);
                this.refreshTime();
            }
        );
    }
    // event component에서 이벤트를 추가했을 때 호출되는 콜백이다.
    // 이벤트 목록에 push한다.
    addEventCallback(addedEvent : CalendarEvent) : void{
        console.log(addedEvent);
        console.log(this.calendarEvents);
        this.calendarEvents.push(addedEvent);
        this.markEvents();
    }
    // 이벤트를 수정했을 때 콜백이다.
    // 별다른 행동은 없다.
    editEventCallback(){
        console.log(this.calendarEvents);
        
    }
    // 삭제했을 때 콜백이다.
    // id를 비교해 .map함수로 위치를 얻어온 다음, splice로 해당 멤버만 빼낸다.
    deleteEventCallback(deletedEvent : CalendarEvent){
        console.log(deletedEvent);
        console.log(this.calendarEvents);
        const pos = this.calendarEvents.map(elem => elem._id).indexOf(deletedEvent._id);
        console.log(pos);
        this.calendarEvents.splice(pos, 1);
        this.markEvents();
    }
    // setTimeout을 이용한 간단한 시계
    timer() : void{
        for(var i = 0; i < 3600; i++){
            setTimeout(() => {
                this.today = Date.now();
            }, 1000 * (i + 1));
        }
    }
}