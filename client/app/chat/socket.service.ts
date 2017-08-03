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
        // this.socket.emit("login", {
        //     name : "newbie",
        //     userid : "qwer@gmail.com"
        // });
    }
    public send(msg : any) : void{
        console.log(msg);
        this.socket.emit('chat', msg);
    }
    public get(){
        let observable = new Observable(observer => {
            // this.socket.on('login', (data) => {
            //     console.log('login ' + data);
            //     observer.next(data);
            // });
            this.socket.on('chat', (data) => {
                console.log('chat ' + data);
                observer.next(data);
            });
            return () => this.socket.disconnect();
        });
        return observable;
    }
    public getmsg(){
        let observable = new Observable(observer =>{
            this.socket.on('chat', (data) => {
                console.log('chat ' + data);
                observer.next(data);
            });
        });
        return observable;
    }
    public disconnect(){
        this.socket.disconnect();
    }
}