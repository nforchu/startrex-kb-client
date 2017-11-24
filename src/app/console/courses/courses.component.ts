import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/Router';
import { CourseService } from '../../services/course.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Course } from '../../entities/course';
import { HomepageService } from '../../services/homepage.service';

@Component({
  selector: 'st-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [ CourseService]
})
export class CoursesComponent implements OnInit {

  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _authService: AuthenticationService,
              private _courseService:CourseService,
              private _homepageService: HomepageService) { }
  returnValue:any;
  courses:any;
  course;
  ngOnInit() {
      if(this._authService.userAuthenticated()){
          //this.loadCoursesByDomain(4);
          this.isLoaded();
      }
  }

  public isLoaded(){
    this._homepageService.homepageCoursesDataSource.subscribe(
       (data) => {
          if(data == 'empty'){
            var sub = this._route.params.subscribe(
               params => {
                 if(!isNaN(params['domainId'])){
                     this.loadCoursesByDomain(params['domainId']);
                 }else{
                   this._router.navigate(['dashboard/domains']);
                 }
               });

          }else{
            this.courses = data;
            console.log("data pulled from hompage service");
          }
       }
    )
  }

  loadCoursesByDomain(domainId: number){
    //this._presentationService.loadBarOn();
    this._courseService.findByDomain(domainId).subscribe(
        (data) => {
          this.returnValue = data;
          this.courses = this.returnValue.context.courses.content;
          console.log("data pulled from server");
        },
        (error) =>
        {
          this._router.navigate(['login']);
          console.error('An error occurred in dashboard component, navigating to login: ', error);

        }
    );
  }

}
