import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router, ActivatedRoute } from '@angular/Router';
import { HomepageService } from './services/homepage.service';
import { AceControls } from '../st-controls/ace-controls';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService, HomepageService, AceControls]
})
export class AppComponent {
  title = 'app';

  constructor(private _router:Router,
              private _authService: AuthenticationService) { }

  ngOnInit() {
      if(!this._authService.userAuthenticated()){
          this._router.navigate(['login']);
      }
  }

  isUserLoggedIn(){
    if(this._authService.getToken() != '')
        return true;
    else
        return false;
  }

  logout(){
    this._authService.logout();
    this._router.navigate(['login']);
    window.location.reload(true);
  }
}
