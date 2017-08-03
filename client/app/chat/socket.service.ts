import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from './message.model';

import * as socketio from 'socket.io-client';

let SERVER_URL = 'http://localhost:8080';

@Injectable()
export class SocketService{
    private socket;
    constructor() {
        this.initSocket();
    }
    private initSocket() : void {
        this.socket = socketio(SERVER_URL);
        this.socket.emit("login", {
            name : "asdf",
            userid : "qwer@gmail.com"
        });
    }
    public send(msg : Message) : void{
        this.socket.emit('message', msg);
    }
    public get(){
        let observable = new Observable(observer => {
            this.socket.on('login', (data) => {
                observer.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        });
        return observable;
    }

}