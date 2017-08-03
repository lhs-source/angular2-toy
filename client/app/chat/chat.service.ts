import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getChats(): Observable<any> {
    return this.http.get('/api/chats').map(res => res.json());
  }

  countChats(): Observable<any> {
    return this.http.get('/api/chats/count').map(res => res.json());
  }

  addChat(chat): Observable<any> {
    return this.http.post('/api/chat', JSON.stringify(chat), this.options);
  }

  getChat(chat): Observable<any> {
    return this.http.get(`/api/chat/${chat._id}`).map(res => res.json());
  }

  editChat(chat): Observable<any> {
    return this.http.put(`/api/chat/${chat._id}`, JSON.stringify(chat), this.options);
  }

  deleteChat(chat): Observable<any> {
    return this.http.delete(`/api/chat/${chat._id}`, this.options);
  }
}
