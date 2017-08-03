import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user/user.model';
import { Message } from './message.model';
import { SocketService } from './socket.service';


import { AuthService } from '../user/auth.service';
import { UserService } from '../user/user.service';
import { ChatService } from './chat.service';


let AVATAR_URL = 'http://avatar.3sd.me/80';

@Component({
    selector : 'chat',
    templateUrl : './chat.component.html',
    styleUrls : ['./chat.component.css'],
    providers : [SocketService]
})
export class ChatComponent implements OnDestroy, OnInit{
    private user : any;
    private users : any[];
    private messages : Message[];
    private messageContent : string;
    private ioConnection : any;

    constructor(private chatServ : ChatService,
                private socketServ : SocketService,
                private auth: AuthService,
                private userService: UserService){

    }
    ngOnInit() : void{
        this.initModel();
        this.initIoConnection();
    }
    ngOnDestroy() : void{
        this.socketServ.disconnect();
    }
    private initModel() : void {
        this.getUser();
        this.messages = [];
    }

    private initIoConnection() : void{
        // 받는 부분 등록
        this.ioConnection = this.socketServ.get().subscribe((msg : any) => {
            console.log("why here printed over and over again!!");
            //this.messages.push(new Message(msg, "login!!", new Date()));
        });
        
        this.socketServ.getmsg().subscribe( (msg : any) => {
            console.log("get");
            this.messages.push(new Message(msg.from, msg.msg, msg.when));
        });
        this.chatServ.getChats().subscribe(
            data => this.messages = data,
            error => console.log(error),
            () => {}
        )
    }
    getUser() {
        this.userService.getUser(this.auth.currentUser).subscribe(
            data => { 
                if(data) {
                    this.user = data; 
                }
                else {
                    this.user = new User(this.getRandomUsername(), AVATAR_URL); 
                }
            },
            error => {
                console.log(error); 
                this.user = new User(this.getRandomUsername(), AVATAR_URL); 
            },
            () => { }//this.isLoading = false
        );
    }

    private getRandomUsername() : string {
        return 'user-'+(Math.floor(Math.random() * (10000 - 0)) + 1);
    }
    sendMessage() : void {
        this.socketServ.send({from : this.user.username, msg : this.messageContent, date : new Date()});
        this.chatServ.addChat({from : this.user.username, msg : this.messageContent, date : new Date()}).subscribe(
            res => {
                const newChat = res.json();
                //this.messages.push(newChat);
                //this.toast.setMessage('item added successfully.', 'success');
            },
            error => console.log(error)
        );
        this.messageContent = null;
    }
    enter(event : any) : void{
        this.sendMessage();
    }
}
