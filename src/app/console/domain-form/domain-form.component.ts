import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/Router';

import { DomainService } from '../../services/domain.service';
import { Domain } from '../../entities/domain';

@Component({
  selector: 'app-domain-form',
  templateUrl: './domain-form.component.html',
  styleUrls: ['./domain-form.component.css'],
  providers: [DomainService]
})
export class DomainFormComponent implements OnInit {
  returnValue:any;
  form: FormGroup;
  domain: Domain;
  constructor(private _route: ActivatedRoute,
              private _domainService: DomainService) { }

  ngOnInit() {
    this.loadDomainData();
  }

  private loadDomainData(){
     var sub = this._route.params.subscribe(
        params => {
          if(!isNaN(params['domainId'])){
            this._domainService.get(+params['domainId']).subscribe(
                  (data) => {
                    this.domain = data.context.domain;
                    this.buildDomainForm(this.domain);
                  });
          }
        });
  }

  private buildDomainForm(d): FormGroup{
      return this.form  = new FormGroup({
          id: new FormControl(+d.id),
          name: new FormControl(d.name),
          description: new FormControl(d.description)
        });
     }

}
