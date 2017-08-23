export class Thread {
    constructor(
        public _id : number,
        public userid : string, 
        public username : string, 
        public title : string, 
        public content : string,
        public create_date : number,
        public update_date : number){
        
    }
}