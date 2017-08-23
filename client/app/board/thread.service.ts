import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Thread } from './thread.model';

@Injectable()
export class ThreadService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  thre : Thread;

  constructor(private http: Http) {
    console.log("Service : Thread(Constructor)");
   }

  getThreads(): Observable<any> {
    return this.http.get('/api/threads').map(res => res.json());
  }

  countThreads(): Observable<any> {
    return this.http.get('/api/threads/count').map(res => res.json());
  }

  addThread(thread): Observable<any> {
    return this.http.post('/api/thread', JSON.stringify(thread), this.options);
  }

  getThread(thread): Observable<any> {
    return this.http.get(`/api/thread/${thread._id}`).map(res => res.json());
  }

  editThread(thread): Observable<any> {
    return this.http.put(`/api/thread/${thread._id}`, JSON.stringify(thread), this.options);
  }

  deleteThread(thread): Observable<any> {
    return this.http.delete(`/api/thread/${thread._id}`, this.options);
  }

}