import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import { SysConfig } from '../config/config';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class QuestionService {

  public questionListSource =  new BehaviorSubject<any>(null);
  constructor(private _httpService:Http,
              private _authService: AuthenticationService) { }

  public get(id){
    return this._httpService.get(SysConfig.apiUrl+'/question/get/'+id, this._authService.getHeaderOptions())
                            .map((response) => response.json());
   }

  public getAll(){
    var url: string = SysConfig.apiUrl+'/question/all';
    return this._httpService.get(url, this._authService.getHeaderOptions()).map(
      (response) => response.json()
    );
   }

   public getFirstByChapter(topicId){
     return this._httpService.get(SysConfig.apiUrl+'/question/first/'+topicId, this._authService.getHeaderOptions())
                             .map((response) => response.json());
    }


   public getAllByTopic(domainId){
     var url: string = SysConfig.apiUrl+'/domain/'+domainId+'/courses?page=0&size=4';
     return this._httpService.get(url, this._authService.getHeaderOptions()).map(
      (response) => response.json()
     );
   }

   public add(audiovisual){
      let body = JSON.stringify(audiovisual);
      return this._httpService.post(SysConfig.apiUrl+'/question/add', body,this._authService.getHeaderOptions()).map(
        (response) => response.json()
      );
   }

   public update(course){
      let body = JSON.stringify(course);
      return this._httpService.patch(SysConfig.apiUrl+'/question/update', body,this._authService.getHeaderOptions()).map(
        (response) => response.json()
      );
   }


}
