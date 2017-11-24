import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/Router';


import { AuthenticationService } from '../../services/authentication.service';
import { HomepageService } from '../../services/homepage.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  constructor(private _router: Router,
              private _route:ActivatedRoute,
              private _authService:AuthenticationService,
              private _homepageService: HomepageService) {  }


  ngOnInit() {
      this.loadHomepageData();
  }

  loadHomepageData(){
     this._homepageService.getHomepageData().subscribe(
       (data) => {
         console.log(data);
         if(data.responseStatus == "OK"){
             if(data.context.homepage.domains){
                 this._homepageService.homepageDomainsDataSource.next(data.context.homepage.domains);
                 this._router.navigate(['dashboard/domains']);
             }else if(data.context.homepage.courses){
                 this._homepageService.homepageCoursesDataSource.next(data.context.homepage.courses);
                 //console.log("pushing data to service");
                 this._router.navigate(['dashboard/courses']);
             }
             //this._router.navigate(['dashboard/courses']);
           }else{
               //this.invalidCredentials = "Invalid login credentials";
           }
       },
       (error) => console.log(error)
     );
   }

}
