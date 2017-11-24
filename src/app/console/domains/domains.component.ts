import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { HomepageService } from '../../services/homepage.service';
import { DomainService } from '../../services/domain.service';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css'],
  providers: [ DomainService ]
})
export class DomainsComponent implements OnInit {

  returnValue:any;
  domains:any;
  domain;
  constructor(private _authService: AuthenticationService,
              private _homepageService: HomepageService,
              private _domainService: DomainService) { }

  ngOnInit() {
    if(this._authService.userAuthenticated()){
        //this.loadCoursesByDomain(4);
        this.isLoaded();
    }

  }

  public isLoaded(){
    this._homepageService.homepageDomainsDataSource.subscribe(
       (data) => {
          if(data == 'empty'){
             this.loadUserDomains();
          }else{
            this.domains = data;
            console.log("data pulled from hompage service");
          }
       }
    )
  }

  public loadUserDomains(){
    //this._presentationService.loadBarOn();
    this._domainService.getUserDomains().subscribe(
        (data) => {
          this.returnValue = data;
          //console.log(data);
          this.domains = this.returnValue.context.domains;
          console.log("data pulled from server");
        },
        (error) =>
        {
          //this._router.navigate(['login']);
          console.error('An error occurred in dashboard component, navigating to login: ', error);

        }
    );
  }

}
