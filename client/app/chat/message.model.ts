import { User } from '../user/user.model';

export class Message{
    constructor(public from: User, public content : string, public when : Date){
        
    }
}