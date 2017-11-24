import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/Router';
import { AuthUser } from '../../entities/auth-user';
import { AuthenticationService } from '../../services/authentication.service';
import { HomepageService } from '../../services/homepage.service';
import { AceControls } from '../../../st-controls/ace-controls';

//import * as Controls from '../../..st-controls.js';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
    form: FormGroup;
    authUser: AuthUser;
    invalidCredentials: string;
    constructor(private _router: Router,
                private _route:ActivatedRoute,
                private _authService:AuthenticationService,
                private _homepageService: HomepageService,
                private _aceControls: AceControls
              ) {  }

  ngOnInit() {
    this.buildForm();
    this._aceControls.loadData();
  }

  private buildForm(): FormGroup{
      return this.form  = new FormGroup({
              username: new FormControl(),
              password: new FormControl(),
            });
      }

  onFormSubmit(formData){

      this.authUser = new AuthUser(formData.username, formData.password);
      this._authService.authenticate(this.authUser).subscribe(
        (data) => {
            console.log(data);
            if(data.responseStatus == "OK"){
                localStorage.setItem('currentUser', JSON.stringify({ username: data.context.user.username, token: data.context.tokenAccessor.token }));
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
                this.invalidCredentials = "Invalid login credentials";
            }
        },
        (error) => console.log(error)
      );
  }

}
