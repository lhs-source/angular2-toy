import { Component, OnInit } from '@angular/core';

import { CalendarCell } from './calendar-cell.class';
import { CalendarService } from './calendar.service';


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

    constructor(private calServ : CalendarService){

    }
    ///////////
    // Methods
    ///////////
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
    setCalendarCells(thisMonth : Date, startDay : number, LastDay : number){
        var start;

        var date = thisMonth.getDate();
        var month = thisMonth.getMonth();
        var year = thisMonth.getFullYear();

        // var selDate = this.selectedCell.date.getDate();
        // var selMonth = this.selectedCell.date.getMonth();
        // var selYear = this.selectedCell.date.getFullYear();

        // 저번달
        if(startDay === 0){ 
            // 시작이 일요일이면 한줄 추가
            startDay += 7;
        }
        for(var i = 0; i < startDay; i++){
            this.cells[i].date.setFullYear(year, month, - (startDay - i) + 1);
            this.cells[i].isThisMonth = false;
            this.cells[i].isClicked = false;
        }
        // 이번달
        for(var i = 0; i < this.endofthismonth; i++){
            start = i + startDay;

            this.cells[start].date.setFullYear(year, month, i + 1);
            this.cells[start].isThisMonth = true;
            this.cells[start].isClicked = false;

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
            this.cells[start].isThisMonth = false;
            this.cells[start].isClicked = false;
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
        this.refreshTime();
    }
    click_Cell(index : number) : void {
        if(this.cells[index].date.getMonth() === this.month){
            this.selectedCell.isClicked = false;
            this.selectedCell = this.cells[index];
            this.selectedCell.isClicked = true;
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
}