import { User } from '../user/user.model';

export class Message{
    constructor(public from: string, public msg : string, public date : Date){
        
    }
}