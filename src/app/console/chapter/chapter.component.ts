import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/Router';

import { CourseService } from '../../services/course.service';
import { CategoryService } from '../../services/category.service';
import { ChapterService } from '../../services/chapter.service';
import { Course } from '../../entities/course';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css'],
  providers: [ChapterService]
})
export class ChapterComponent implements OnInit {
  course: Course;
  categories;
  returnValue;
  chapters;
  chapter;
  constructor(private _courseService:CourseService,
              private _categoryService:CategoryService,
              private _chapterService: ChapterService,
              private _route:ActivatedRoute) { }

  ngOnInit() {
    this.loadCourseOnTotalPageReload();
    this.doSubscriptions();
  }

  private loadCourseOnTotalPageReload(){
    var sub = this._route.params.subscribe(params => {
      if(this._courseService.courseSubjectSource.getValue() == 'empty'){
        if(!isNaN(params['id'])){
          this._courseService.get(+params['id']).subscribe(
                (data) => {
                  this.returnValue = data;
                  this.course = this.returnValue.context.course;
                  this.categories = this.returnValue.context.categories.content;
                  this._courseService.assignSubject(this.course);
                  this._categoryService.assignCategories(this.categories);
                });
        }
      }
    });
  }

  private doSubscriptions(){
    this._chapterService.chaptersSource.subscribe(
      (data) => {
        this.chapters = data;
      });

      this._courseService
          .courseSubjected.subscribe(
          (data)  => {
                      this.course = data;
                    },
          (error) => alert("error"),
          ()      => alert("done"));
  }

}
