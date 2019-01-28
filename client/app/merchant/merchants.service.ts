import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MerchantsService {

  private headers = new Headers({ 'Content-Type': 'applimerchantion/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getMerchants(): Observable<any> {
    return this.http.get('/api/merchants').map(res => res.json());
  }

  countMerchants(): Observable<any> {
    return this.http.get('/api/merchants/count').map(res => res.json());
  }

  addMerchant(merchant): Observable<any> {
    return this.http.post('/api/merchant', JSON.stringify(merchant), this.options);
  }

  getMerchant(merchant): Observable<any> {
    return this.http.get(`/api/merchant/${merchant._id}`).map(res => res.json());
  }

  editMerchant(merchant): Observable<any> {
    return this.http.put(`/api/merchant/${merchant._id}`, JSON.stringify(merchant), this.options);
  }

  deleteMerchant(merchant): Observable<any> {
    return this.http.delete(`/api/merchant/${merchant._id}`, this.options);
  }
}
