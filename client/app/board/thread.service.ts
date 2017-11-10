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
    // class Thread {
    //     public _id? : number;
    //     public userid : string;
    //     public username : string;
    //     public title : string;
    //     public category : string;
    //     public content : string;
    //     public create_date : number;
    //     public update_date : number;
    //     public comments? : any[];
    // }
    addThread(thread): Observable<any> {
        return this.http.post('/api/thread', JSON.stringify(thread), this.options);
    }

    // let condition = {
    //     _id : this.id
    // };
    getThread(thread): Observable<any> {
        return this.http.get(`/api/thread/${thread._id}`).map(res => res.json());
    }

    editThread(thread): Observable<any> {
        return this.http.put(`/api/thread/${thread._id}`, JSON.stringify(thread), this.options);
    }

    // const condition = {
    //     _id : this.id
    // };
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

    // let comment = {
    //     _discussion_id : this.id,
    //     _parent_id : "-1",
    //     userid : this.auth.currentUser._id, 
    //     username : this.auth.currentUser.username, 
    //     content : this.commentContent.nativeElement.innerHTML,
    //     create_date : Date.now(),
    //     update_date : Date.now(),
    // };
    // const condition = {
    //     _id : comment._discussion_id, 
    //     comments : comment
    // };
    addComment(comment): Observable<any> {
        return this.http.put(`/api/thread/${comment._id}/comment`, JSON.stringify(comment), this.options).map(res => res.json());
    }

    getComment(comment): Observable<any> {
        return this.http.get(`/api/thread/${comment._id}/comment/${comment.comments._id}`).map(res => res.json());
    }

    // let condition = {
    //     _id : this.selComment._discussion_id, // 이 thre의 id를 가진 thre에다가
    //     comments : {
    //         _id : this.selComment._id, // 이 id의 comments를 수정하겠다.
    //         content : this.commentContent.nativeElement.innerHTML, 
    //         update_date : Date.now()
    //     }
    // };
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