import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { SysConfig } from '../config/config';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HomepageService {

  public homepageDomainsDataSource =  new BehaviorSubject<any>('empty');
  public homepageCoursesDataSource =  new BehaviorSubject<any>('empty');
  constructor(private _httpService:Http,
              private _authService: AuthenticationService) { } 


  public getHomepageData(){
    var url: string = SysConfig.apiUrl+'/user/homepage';
    return this._httpService.get(url, this._authService.getHeaderOptions()).map(
      (response) => response.json()
    );
   }

}
