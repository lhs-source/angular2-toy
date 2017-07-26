import { Component, OnInit } from '@angular/core';

const monthStringFull : string[] = [
    "January", 
    "Fabruary", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
];
const weekofdayStringFull : string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const EOTD : number[] = [
    31,
    30,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
];


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
    todayDate : Date;

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

    num1 : number;
    num2 : number;

    cells : CalendarCell[] = [];
    selectedCell : CalendarCell;

    ///////////
    // Methods
    ///////////
    refreshTime() : void{
        // ��ҵ� ��������
        this.day = this.todayDate.getDate();
        this.month = this.todayDate.getMonth();
        this.monthStr = monthStringFull[this.month];
        this.year = this.todayDate.getFullYear();
        this.weekofday = this.todayDate.getDay();
        this.weekofdayStr = weekofdayStringFull[this.weekofday];
        this.timezone = this.todayDate.getTime();
        this.timezoneoffset = this.todayDate.getTimezoneOffset();

        // �̴��� �������� 
        this.endofthismonth = EOTD[this.month];
        // ����
        if(this.year % 4 === 0 && this.month === 1){
            this.endofthismonth++;
        }
        // �̴��� ù�� ���
        this.num1 = this.thismonthFirst.setFullYear(this.year, this.month, 1);
        // �̴��� ��������  ���
        this.num2 = this.thismonthLast.setFullYear(this.year, this.month, this.endofthismonth);

        // ù���� ���������� ����
        var startDay = this.thismonthFirst.getDay();
        var LastDay = this.thismonthLast.getDay();
        var start;

        this.cells = [];
        // �������� ��¥��
        if(startDay === 0){
            startDay += 7;
        }
        for(var i = 0; i < startDay; i++){
            this.cells[i] = new CalendarCell(
                new Date(this.year, this.month, - (startDay - i) + 1).getTime()
            );
        }
        // �̴��� ��¥��
        for(var i = 0; i < this.endofthismonth; i++){
            start = i + startDay;
            this.cells[start] = new CalendarCell(
                new Date(this.year, this.month, i + 1).getTime(), true
            );
        }
        // �������� ��¥��
        if(LastDay === 6){
            LastDay -= 7;
        }
        for(var i = 0; i < 6 - LastDay; i++){
            start = i + this.endofthismonth + startDay;
            this.cells[start] = new CalendarCell(
                new Date(this.year, this.month + 1, i + 1).getTime()
            );
        }
    }
    ngOnInit() : void{
        // instance�� ����
        this.today = Date.now();
        this.todayDate = new Date();
        this.thismonthFirst = new Date();
        this.thismonthLast = new Date();
        this.selectedCell = new CalendarCell(Date.now());

        // ��¥ ����
        this.todayDate.setTime(this.today);
        this.todayDate.setMonth(6);


        this.refreshTime();
    }
    clickCell(index : number) : void {
        if(this.cells[index].date.getMonth() === this.month){
            this.selectedCell.isClicked = false;
            this.selectedCell = this.cells[index];
            this.selectedCell.isClicked = true;
        }
        else{
            this.todayDate.setFullYear(this.cells[index].date.getFullYear(), this.cells[index].date.getMonth(), this.cells[index].date.getDate());
            //this.todayDate.setFullYear(this.year, 
            //    this.cells[index].date.getMonth() > this.month ? this.month + 1: this.month - 1);
            this.selectedCell = this.cells[index];
            this.refreshTime();
        }
        this.today = this.todayDate.getTime();
    }
}
export class CalendarCell{
    date : Date;
    isThisMonth : boolean;
    isClicked : boolean;
    constructor(datenumber? : number, thismonth? : boolean){
        this.date = new Date();
        if(datenumber){
            this.date.setTime(datenumber);
        }
        this.isThisMonth = thismonth ? thismonth : false;
    }
}