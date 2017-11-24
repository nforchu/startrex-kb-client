import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/Router';

import { CourseService } from '../../services/course.service';
import { ChapterService } from '../../services/chapter.service';
import { Chapter } from '../../entities/chapter';

@Component({
  selector: 'app-chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.css']
})
export class ChapterFormComponent implements OnInit {
  form: FormGroup =  new FormGroup({});
  operation: string = 'Form';
  returnValue;
  chapters;
  chapter:Chapter;
  course;
  constructor(private _chapterService:ChapterService,
              private _courseService:CourseService,
              private _route:ActivatedRoute) { }

  ngOnInit() {

   /*this._chapterService.get(5).subscribe(
          (data) => {
            this.returnValue = data;
            this.chapter =this.returnValue.context.topic;
            this.chapters =this.returnValue.context.topics.content;
            this._chapterService.chapterSource.next(this.chapter);
            this._chapterService.chaptersSource.next(this.chapters);
             this.buildChapterForm(new Chapter());
            //console.log(this.returnValue.context.topics.content);
          });*/
    this.doSubscriptions();

  }

  ngDoCheck(){

  }

  ngAfterContentInit(){
    this.loadChapter();
  }

  private doSubscriptions(){
    this._courseService
        .courseSubjected.subscribe(
        (data)  => {
                    this.course = data;
                  },
        (error) => alert("error"),
        ()      => alert("done"));
  }
  private loadChapter(){
    var sub = this._route.params.subscribe(params => {
        if(!isNaN(params['chapterId'])){
          this._chapterService.get(+params['chapterId']).subscribe(
                (data) => {
                  this.returnValue = data;
                  this.chapter =this.returnValue.context.topic;
                  this.chapters =this.returnValue.context.topics.content;
                  this._chapterService.chapterSource.next(this.chapter);
                  this._chapterService.chaptersSource.next(this.chapters);
                  this.buildChapterForm(this.chapter);
                });
        }else if(params['new'] && params['new']=='new'){
            this._chapterService.getFirstAndList(10).subscribe(
                  (data) => { //adjust to load only list of chapters
                    this.returnValue = data;
                    //this.chapter =this.returnValue.context.topic;
                    this.chapter = new Chapter();
                    this.chapter.id = null;
                    this.chapters =this.returnValue.context.topics.content;
                    //this._chapterService.chapterSource.next(this.chapter);
                    this._chapterService.chaptersSource.next(this.chapters);
                    this.buildChapterForm(this.chapter);
                  });
            this.buildChapterForm(this.chapter);
        }else{

          this._chapterService.getFirstAndList(10).subscribe(
                (data) => {
                  this.returnValue = data;
                  this.chapter =this.returnValue.context.topic;
                  this.chapters =this.returnValue.context.topics.content;
                  this._chapterService.chapterSource.next(this.chapter);
                  this._chapterService.chaptersSource.next(this.chapters);
                  this.buildChapterForm(this.chapter);
                });
        }
    });
  }

  private buildChapterForm(c): FormGroup{
    if(this.chapter){
      return this.form  = new FormGroup({
              id: new FormControl(+c.id),
              title: new FormControl(c.title),
              weight: new FormControl(c.weight),
              description: new FormControl(c.description),
              prerequisite: new FormControl(c.prerequisite),
              hasVideo: new FormControl(this.responseDecoder(c.hasVideo)),
              hasQuiz: new FormControl(this.responseDecoder(c.hasQuiz)),
              hasText: new FormControl(this.responseDecoder(c.hasText)),
              published: new FormControl(this.responseDecoder(c.published)),
              visibility: new FormControl(this.responseDecoder(c.visibility))
            });
          }
    }

    responseDecoder(value: string, field?:string){
      if((value != null && value=="RESTRICTED") || (value == 'YES')){
        return true;
      }else{
        return false;
      }
    }


    extractFormData(form){
      console.log(form.weight);

      //var course; ===> Update function to user local variable and only
                         //update the instance course  after server operation is complete
      this.chapter.id = form.id;
      this.chapter.title = form.title;
      this.chapter.courseId = this.course.id;
      this.chapter.weight =form.weight;
      this.chapter.description =form.description;
      this.chapter.prerequisite =form.prerequisite;
      if(form.hasVideo == true)
        this.chapter.hasVideo = "YES";
      else
        this.chapter.hasVideo = "NO";

      if(form.hasQuiz == true)
        this.chapter.hasQuiz = "YES";
      else
        this.chapter.hasQuiz = "NO";

        if(form.hasVideo == true)
        this.chapter.hasText = "YES";
      else
        this.chapter.hasText = "NO";

      if(form.published == true)
        this.chapter.published = "YES";
      else
        this.chapter.published = "NO";

        if(form.visibility == true)
        this.chapter.visibility = "RESTRICTED";
      else
        this.chapter.visibility = "PUBLIC";

      console.log(this.chapter);
      return this.chapter;
    }

    onFormSubmit = function (form){
      alert(form.id + " " + isNaN(form.id));

      if(!isNaN(form.id) && form.id != 0){
        alert("chapter update");
        this._chapterService.update(this.extractFormData(form)).subscribe(
          (data) => console.log(data),
          (error) => console.log("error occured"),
          () => alert("all is done")
        );
      }else{
        alert("new chapter");
        this._chapterService.add(this.extractFormData(form)).subscribe(
          (data) => console.log(data),//update this seciton for page redirect after courase is created
                                      //this is to ensure that the address location always points to the object being displayed
          (error) => console.log("error occured"),
          () => alert("all is done")
        );
      }
    }

}
