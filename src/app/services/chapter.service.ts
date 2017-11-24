import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { SysConfig } from '../config/config';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ChapterService {

  public chapterSource =  new BehaviorSubject<any>(null);
  public chaptersSource =  new BehaviorSubject<any>(null);
  constructor(private _httpService:Http,
              private _authService: AuthenticationService) { }

  public get(id){
    return this._httpService.get('http://localhost:8080/topic/'+id, this._authService.getHeaderOptions())
                            .map((response) => response.json());
   }

   public getFirstAndList(courseId){
     return this._httpService.get('http://localhost:8080/topic/get/'+courseId, this._authService.getHeaderOptions())
                             .map((response) => response.json());
    }

    public findByCourse(courseId){
      var url: string = 'http://localhost:8080/course/'+courseId+'/topics?page=0&size=4';
      return this._httpService.get(url, this._authService.getHeaderOptions()).map(
       (response) => response.json()
      );
    }

    public add(topic){
       let body = JSON.stringify(topic);
       return this._httpService.post('http://localhost:8080/topic/add', body, this._authService.getHeaderOptions()).map(
         (response) => response.json()
       );
    }

    public update(topic){
       let body = JSON.stringify(topic);
       return this._httpService.patch('http://localhost:8080/topic/update', body,this._authService.getHeaderOptions()).map(
         (response) => response.json()
       );
    }
}
