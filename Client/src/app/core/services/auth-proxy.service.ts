import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

// Models
import { LoginApiModel } from '../../models';
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class AuthProxyService {
  private endpointUrl: string = "";
  private headers: Headers;


  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");

    this.endpointUrl = environment.IDSRAddress;
    console.log("Getting environment api address as: " + environment.IDSRAddress);
  }

  getToken(loginModel: LoginApiModel): Observable<any> {
    return this.http.post(this.endpointUrl + "/api/Auth/SignIn", JSON.stringify(loginModel), { headers: this.headers })
      .map((response) => response.json())
      .catch(error => this.handleError(error));
  }

  refreshToken() {
    return this.http.post(this.endpointUrl + "/api/Auth/Refresh", JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }), { headers: this.headers })
      .map((response) => response.json())
      .catch(error => this.handleError(error));
  }

  handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error || "Server error");
  }

}
