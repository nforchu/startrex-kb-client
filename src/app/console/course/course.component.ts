import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../services/course.service';
import { CategoryService } from '../../services/category.service';
import { Course } from '../../entities/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [ CourseService, CategoryService]
})
export class CourseComponent implements OnInit {
  returnValue;
  id;
  categories;

  course: Course = null;
  constructor(private _courseService:CourseService,
              private _categoryService:CategoryService) { }


  ngOnInit() {
    this.doSubscriptions();
  }

  private doSubscriptions(){
    this._courseService
        .courseSubjected.subscribe(
        (data)  => {
                    this.course = data;
                  },
        (error) => alert("error"),
        ()      => alert("done"));
    this._categoryService
        .categorySubjectObservable.subscribe(
        (data)  => {
                    this.categories = data;
                  },
        (error) => alert("error"),
        ()      => alert("done"));
  }

}
