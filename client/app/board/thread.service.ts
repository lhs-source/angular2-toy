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
  category : {name : string};
  page : number;

  constructor(private http: Http) {
    console.log("Service : Thread(Constructor)");
   }

  getThreads(category): Observable<any> {
    this.category = {name : category.category};
    return this.http.get(`/api/threads/${category.category}/${category.page}`).map(res => res.json());
  }

  countThreads(category): Observable<any> {
    console.log(category);
    return this.http.get(`/api/threadscount/${category.category}`).map(res => res.json());
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
    return this.http.get(`/api/thread/${comment._id}/comments`).map(res => res.json());
  }

  countComments(comment): Observable<any> {
    return this.http.get(`/api/thread/${comment._id}/comments/count`).map(res => res.json());
  }

  addComment(comment): Observable<any> {
    return this.http.put(`/api/thread/${comment._id}/comment`, JSON.stringify(comment), this.options).map(res => res.json());
  }

  getComment(comment): Observable<any> {
    return this.http.get(`/api/thread/${comment._id}/comment/${comment.comments._id}`).map(res => res.json());
  }

  editComment(comment): Observable<any> {
    return this.http.put(`/api/thread/${comment._id}/comment/${comment.comments._id}`, JSON.stringify(comment), this.options);
  }

  deleteComment(comment): Observable<any> {
    //return this.http.delete(`/api/thread/${comment._id}/comment/${comment.comments._id}`, this.options);
    return this.http.put(`/api/thread/${comment._id}/comment/${comment.comments._id}`, this.options);
  }

  ////////////////////////////////////////////////

  getCategorys(): Observable<any> {
    return this.http.get('/api/categories').map(res => res.json());
  }

  countCategorys(): Observable<any> {
    return this.http.get('/api/categories/count').map(res => res.json());
  }

  addCategory(category): Observable<any> {
    return this.http.post('/api/category', JSON.stringify(category), this.options);
  }

  getCategory(category): Observable<any> {
    return this.http.get(`/api/category/${category._id}`).map(res => res.json());
  }

  editCategory(category): Observable<any> {
    return this.http.put(`/api/category/${category._id}`, JSON.stringify(category), this.options);
  }

  deleteCategory(category): Observable<any> {
    return this.http.delete(`/api/category/${category._id}`, this.options);
  }
}