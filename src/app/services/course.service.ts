import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { SysConfig } from '../config/config';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class CourseService {
  public courseSubjectSource =  new BehaviorSubject<any>("empty");
  public contentDisplaySource = new BehaviorSubject<any>('empty');
  course;

  courseSubjected = this.courseSubjectSource;
  constructor(private _httpService:Http,
              private _authService:AuthenticationService) { }

  public assignSubject(course:any){
    this.courseSubjectSource.next(course);
  }
  public get(id){
    return this._httpService.get('http://localhost:8080/course/'+id, this._authService.getHeaderOptions())
                            .map((response) => response.json());
   }

  public getAll(){
    var url: string = SysConfig.apiUrl+'/course/all';
    return this._httpService.get(url, this._authService.getHeaderOptions()).map(
      (response) => response.json()
    );
   }

   public findByDomain(domainId){
     var url: string = SysConfig.apiUrl+'/domain/'+domainId+'/courses?page=0&size=4';
     return this._httpService.get(url, this._authService.getHeaderOptions()).map(
      (response) => response.json()
     );
   }

   public add(course){
      var body = JSON.stringify(course);
      return this._httpService.post('http://localhost:8080/course/add', body,this._authService.getHeaderOptions()).map(
        (response) => response.json()
      );
   }

   public update(course){
      let body = JSON.stringify(course);
      return this._httpService.patch('http://localhost:8080/course/update', body,this._authService.getHeaderOptions()).map(
        (response) => response.json()
      );
   }

}
