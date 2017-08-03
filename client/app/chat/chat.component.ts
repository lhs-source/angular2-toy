import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { Message } from './message.model';
import { SocketService } from './socket.service';

let AVATAR_URL = 'http://avatar.3sd.me/80';

@Component({
    selector : 'chat',
    templateUrl : './chat.component.html',
    styleUrls : ['./chat.component.css'],
    providers : [SocketService]
})
export class ChatComponent{
    private user : User;
    private messages : Message[];
    private messageContent : string;
    private ioConnection : any;

    constructor(private socketServ : SocketService){

    }
    ngOnInit() : void{
        this.initModel();
        this.initIoConnection();
    }
    private initModel() : void {
        this.user = new User(this.getRandomUsername(), AVATAR_URL);
        this.messages = [];
    }

    private initIoConnection() : void{
        this.ioConnection = this.socketServ.get().subscribe((msg : string) => {

            this.messages.push(new Message(this.user, "login!!", new Date()));
        });
    }

    private getRandomUsername() : string {
        return 'user-'+(Math.floor(Math.random() * (10000 - 0)) + 1);
    }
    sendMessage() : void {
        this.socketServ.send(new Message(this.user, this.messageContent, new Date()));
        this.messageContent = null;
    }
}
