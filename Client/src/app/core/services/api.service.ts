import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';

export interface RequestOptions {
  uri: string;
  method?: RequestMethod;
  body?: any;
  headers?: Headers;
}

@Injectable()
export class ApiService {
  private apiUrl: string;

  constructor(
      private http: Http,
  ) {
      this.apiUrl = `${environment.apiAddress}/api/`;
  }
  
  getAll(controller: string, action = ''): Observable<any> {
    const target = `${this.apiUrl}${controller}/${action}`;
    return this.http
               .get(target)
               .map(response => {
                 const ret = response.json();
                 return ret;
              });
  }
  
  get(id: number, controller: string): Observable<any> {
    const target = this.apiUrl + controller;
    return this.http.get(`${target}/${id}`)
                    .map(response => {
                      const ret = response.json();
                      return ret;
                  });
  }
  getByName(name: string, controller: string): Observable<any> {
    const target = this.apiUrl + controller;
    return this.http.get(`${target}${name}`)
                    .map(response => {
                      const ret = response.json();
                      return ret;
                  });
  }
  
  post(body: any, controller: string): Observable<any> {
    const target = this.apiUrl + controller;
    return this.http.post(target, body)
                    .map(response => {
                      const ret = response.json();
                      return ret;
                  });
  }
  
  put(body: any, id: number, controller: string): Observable<any> {
    const target = this.apiUrl + controller;
    return this.http.put(`${target}/${id}`, body)
                    .map(response => {
                      const ret = response.json();
                      return ret;
                  });
  }
  delete(id: number, controller: string): Observable<any> {
    const target = this.apiUrl + controller;
    return this.http.delete(`${target}${id}`)
      .map(response => {
        const ret = response.json();
        return ret;
      });
  }
}
