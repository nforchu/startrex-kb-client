import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { Observable } from 'rxjs';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';


import { SysConfig } from '../config/config';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class CategoryService {
  public  categorySubjectSource =  new BehaviorSubject<any>("empty");
  categorySubjectObservable = this.categorySubjectSource;
  constructor(private _httpService:Http,
              private _authService:AuthenticationService) { }


  public assignCategories(categories:any){
    this.categorySubjectSource.next(categories);
  }


  public getAll(): Observable<Object>{
    return this._httpService.get('http://localhost:8080/category/all', this._authService.getHeaderOptions())
                            .map(this.extractData)
                            .catch(this.handleError);
   }


 private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }
}
