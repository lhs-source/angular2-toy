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

  ////////////////////////////////////////////

  getComments(comment): Observable<any> {
    console.log(comment);
    return this.http.get(`/api/comments/${comment._discussion_id}`).map(res => res.json());
  }

  countComments(): Observable<any> {
    return this.http.get('/api/comments/count').map(res => res.json());
  }

  addComment(comment): Observable<any> {
    console.log(comment);
    return this.http.post('/api/comment', JSON.stringify(comment), this.options);
  }

  getComment(comment): Observable<any> {
    return this.http.get(`/api/comment/${comment._id}`).map(res => res.json());
  }

  editComment(comment): Observable<any> {
    return this.http.put(`/api/comment/${comment._id}`, JSON.stringify(comment), this.options);
  }

  deleteComment(comment): Observable<any> {
    return this.http.delete(`/api/comment/${comment._id}`, this.options);
  }

}