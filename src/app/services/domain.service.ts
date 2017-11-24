import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { SysConfig } from '../config/config';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class DomainService {

  constructor(private _httpService:Http,
              private _authService: AuthenticationService) { }

  public getUserDomains(){
    var url: string = SysConfig.apiUrl+'/user/domains';
    return this._httpService.get(url, this._authService.getHeaderOptions()).map(
      (response) => response.json()
    );
  }

  public get(domainId){
    var url: string = SysConfig.apiUrl+'/domain/get/'+domainId;
    return this._httpService.get(url, this._authService.getHeaderOptions()).map(
      (response) => response.json()
    );
  }

  public getCourses(domainId){
    var url: string = SysConfig.apiUrl+'/domain/courses/'+domainId;
    return this._httpService.get(url, this._authService.getHeaderOptions()).map(
      (response) => response.json()
    );
  }

}
