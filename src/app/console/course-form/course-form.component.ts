import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/Router';

import { CourseService } from '../../services/course.service';
import { CategoryService } from '../../services/category.service';
import { Course } from '../../entities/course';

@Component({
  selector: 'course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
  providers: []
})
export class CourseFormComponent implements OnInit {
  course: Course;
  categories:any;
  operation: string = "Form";
  form =  new FormGroup({});
  returnValue;
  id;
  constructor(private _courseService:CourseService,
              private _categoryService:CategoryService,
              private _route:ActivatedRoute,
              private _router:Router ) { }

  ngOnInit() {
    this.loadCourse();
  }


  private loadCourse(){
    var sub = this._route.params.subscribe(params => {
      if(!isNaN(params['id'])){//valid id, this implies update is intended
        this._courseService.get(+params['id']).subscribe(
              (data) => {
                this.returnValue = data;
                this.course = this.returnValue.context.course;
                this.categories = this.returnValue.context.categories.content;
                this.buildCourseForm(this.course);
                this._courseService.assignSubject(this.course);
                this._categoryService.assignCategories(this.categories);
              });
      }else{ //no valid id, new course to be created
        this._categoryService.getAll().subscribe(
              (data) => {
                this.returnValue = data;
                this.categories = this.returnValue.context.categories.content;
                this.course = new Course();
                this.course.id = null;
                this.buildCourseForm(this.course);
                this._courseService.assignSubject(this.course);
                this._categoryService.assignCategories(this.categories);
              });
      }
    });
  }

 public setEditor(){
   
 }


  private buildCourseForm(c: Course): FormGroup{
      return this.form  = new FormGroup({
              id: new FormControl(+c.id),
              category: new FormControl(+c.courseCategoryId),
              title: new FormControl(c.title),
              description: new FormControl(c.description),
              audience: new FormControl(c.audience),
              prerequisite: new FormControl(c.prerequisite),
              hasVideo: new FormControl(this.responseDecoder(c.hasVideo)),
              hasQuiz: new FormControl(this.responseDecoder(c.hasQuiz)),
              hasText: new FormControl(this.responseDecoder(c.hasText)),
              published: new FormControl(this.responseDecoder(c.published)),
              visibility: new FormControl(this.responseDecoder(c.visibility))
            });
    }


    public get(id: number){
         this._courseService.get(this.id).subscribe(
             (data) => {
                         this.returnValue = data;
                         this.course = this.returnValue.context.course;
                       },
             (error) => alert('there was an error')
         );
    }

    responseDecoder(value: string, field?:string){
      if((value != null && value=="RESTRICTED") || (value == 'YES')){
        return true;
      }else{
        return false;
      }
    }

    extractFormData(form){
      //var course; ===> Update function to user local variable and only
                         //update the instance course  after server operation is complete
      this.course.id = form.id;
      this.course.courseCategoryId = form.category;
      this.course.domainId = 4;//get domainId from session/cookies
      this.course.title = form.title;
      this.course.audience =form.audience;
      this.course.description =form.description;
      this.course.prerequisite =form.prerequisite;
      if(form.hasVideo == true)
        this.course.hasVideo = "YES";
      else
        this.course.hasVideo = "NO";

      if(form.hasQuiz == true)
        this.course.hasQuiz = "YES";
      else
        this.course.hasQuiz = "NO";

        if(form.hasVideo == true)
        this.course.hasText = "YES";
      else
        this.course.hasText = "NO";

      if(form.published == true)
        this.course.published = "YES";
      else
        this.course.published = "NO";

        if(form.visibility == true)
        this.course.visibility = "RESTRICTED";
      else
        this.course.visibility = "PUBLIC";

      console.log(this.course);
      return this.course;
    }

    onFormSubmit = function (form){
      if(!isNaN(form.id) && form.id != 0){
        this._courseService.update(this.extractFormData(form)).subscribe(
          (data) => console.log(data),
          (error) => console.log("error occured"),
          () => alert("all is done")
        );
      }else{
        this._courseService.add(this.extractFormData(form)).subscribe(
          (data) => {
                    console.log(data);
                    this.course = data.context.course;
                    var url = 'course/' + this.course.id +"/" + this.course.title;
                    this._router.navigate([url]);
                    },//update this seciton for page redirect after courase is created
                                      //this is to ensure that the address location always points to the object being displayed
          (error) => console.log("error occured"),
          () => alert("all is done")
        );
      }
    }
}
