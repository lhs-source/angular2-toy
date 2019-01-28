import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LhsAccountService {
    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });
    
    constructor(private http: Http) {
        console.log("Service : Thread(Constructor)");
    }

    addAcc(acc): Observable<any> {
        return this.http.put(`/accounts/${acc._id}`, JSON.stringify(acc), this.options).map(res => res.json());
    }
}