

export class CalendarEvent {
    date : Date;
    note : String;
    //static textaraeRows : number = 0;

    constructor(dateNum : number, note : string){
        this.date = new Date(dateNum);
        this.note = note;
    }
    getNoteRows() : number{
        var splited = this.note.split("\n");
        var len = splited.length;
        var count = 0;
        splited.forEach(str => {
            count ++;
            //count += str.length / 90;
        });
        return count;
    }
    getTimeCode(year : boolean = true, month : boolean = true, date : boolean = true) : number {
        var value = 0;
        value += year ? this.date.getFullYear() * 10000 : 0;
        value += month ? this.date.getMonth() * 100: 0;
        value += date ? this.date.getDate() : 0;
        return value;
    }
}


