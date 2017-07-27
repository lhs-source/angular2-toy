/////////
// cells
/////////
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
        this.isClicked = false;
    }
}