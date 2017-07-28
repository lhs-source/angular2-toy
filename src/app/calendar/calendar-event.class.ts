

export class CalendarEvent {
    date : Date;
    note : String;

    constructor(dateNum : number, note : string){
        this.date = new Date(dateNum);
        this.note = note;
    }
    getTimeCode(year : boolean = true, month : boolean = true, date : boolean = true) : number {
        var value = 0;
        value += year ? this.date.getFullYear() * 10000 : 0;
        value += month ? this.date.getMonth() * 100: 0;
        value += date ? this.date.getDate() : 0;
        return value;
    }
}


