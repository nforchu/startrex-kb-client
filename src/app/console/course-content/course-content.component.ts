import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/Router';
import { VideoService } from '../../services/video.service';
import { QuestionService } from '../../services/question.service';
import { CourseService } from '../../services/course.service';
@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css'],
  providers: [VideoService, QuestionService, CourseService]
})
export class CourseContentComponent implements OnInit {
  courseContentTypes =  ['Video', 'Questions', 'Notes'];
  form: FormGroup;
  videoList: [{}];
  questionList: [{}];
  contentType: any;
  constructor(private _route:ActivatedRoute,
              private _router:Router,
              private _courseService: CourseService,
              private _videoService: VideoService,
              private _questionService: QuestionService) { }

  ngOnInit() {
    this.buildForm();
    this.doSubscriptions();

  }

  buildForm(){
    let paramLabel;
    let displayContent = "Notes";
    let sub = this._route.params.subscribe(params => {
      if(this._route.firstChild.snapshot)
          paramLabel  = this._route.firstChild.snapshot.params['label'];
      else
          paramLabel = this._route.params['label'];

      if(paramLabel== 'q')
          displayContent ='Questions';
      else if(paramLabel == 'v')
          displayContent = 'Video';
    });
    return this.form  = new FormGroup({
      displayContent: new FormControl(displayContent)
    });
  }

  private doSubscriptions(){
    this._videoService
        .videoListSource.subscribe((data)  => { this.videoList = data; });
    this._questionService
         .questionListSource.subscribe((data)  => { this.questionList = data; });

  }

  splitURL(link){
    let splitURL =  link.split("=");
    return 'https://img.youtube.com/vi/' + splitURL[splitURL.length -1] + '/1.jpg';
  }

  contentDisplaySwitcher(){
    var displayOption = this.form.controls.displayContent.value;
    this.contentType = displayOption;
    var url;
    if(displayOption == 'Video'){
      url = 'course/' + 18 +"/" + "this.course.title" + "/content/video/v";
      this._router.navigate([url]);
    }else if(displayOption == 'Questions'){
      url = 'course/' + 18 +"/" +" this.course.title" + "/content/question/q";
      this._router.navigate([url]);
    }else{
      url = 'course/' + 18 +"/" +" this.course.title" + "/content/notes/n";
      this._router.navigate([url]);
    }
    //alert(this.form.controls.displayContent.value);
  }

}
