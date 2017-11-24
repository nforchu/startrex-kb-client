import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/Router';
import { Http, Response, Headers, RequestOptions} from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { SysConfig } from '../config/config';
import { AuthUser } from '../entities/auth-user';

@Injectable()
export class AuthenticationService {

    constructor(private _route:ActivatedRoute,
                private _router:Router,
                private _httpService:Http) { }

    public authenticate(user: AuthUser){
      var body = JSON.stringify(user);
      return this._httpService.post(SysConfig.apiUrl+'/auth/check', body , this.getHeaderOptions()).map(
        (response) => response.json()
      );
    }

    public getHeaderOptions(){
      let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getToken()
        });
      let options = new RequestOptions({ headers: headers });
      return options;
    }

    public getToken(): String {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      return token ? token : "";
    }

    public userAuthenticated(){
      if(this.getToken() != ""){
          return true;
      }else{
          this._router.navigate(['login']);
      }
      return false;
    }


    public logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this._router.navigate(['login']);
    }


}
