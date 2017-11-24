import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class TopicService {
  public chapterSourse =  new BehaviorSubject<any>(null);
  public chaptersSourse =  new BehaviorSubject<any>(null);
  constructor(private _httpService:Http) { }

  public get(id){
    return this._httpService.get('http://localhost:8080/topic/'+id)
                            .map((response) => response.json());
   }

  
}
