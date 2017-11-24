import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/Router';
import { Video } from '../../entities/video';
import { VideoService } from '../../services/video.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent implements OnInit {
  form: FormGroup;
  videoProviders = ['Youtube', 'Other'];
  video: Video;
  returnValue: any;
  videoList: [{}];
  //url ="https://www.youtube.com/embed/TmwTlvBhuxM";

  constructor(private _videoService:VideoService,
              private _route:ActivatedRoute,
              private _courseService: CourseService,) { }

  ngOnInit() {
    this.loadVideo();

  }

  ngAfterViewChecked(){
    this.onVideoLinkChange();
  }




  private buildForm(video){
      return this.form  = new FormGroup({
        id: new FormControl(+video.id),
        provider: new FormControl(video.provider),
        weight: new FormControl(video.weight),
        published: new FormControl(this.responseDecoder(video.published)),
        visibility: new FormControl(this.responseDecoder(video.visibility)),
        title: new FormControl(video.title),
        link: new FormControl(video.link)
    });
  }

  loadVideo(){
      this._courseService.contentDisplaySource.next('Video');
      let sub = this._route.params.subscribe(params => {
          if(!isNaN(params['videoId'])){
                this._videoService.get(params['videoId']).subscribe(
                    (data) => {
                                this.videoList = data.context.audiovisuals.content;
                                this._videoService.videoListSource.next(this.videoList);

                                this.video = data.context.audiovisual;
                                this.buildForm(this.video);

                              },
                    (error) => console.log(error),
                    ()      => {

                                }
                );

            }else if(params['new'] && params['new']=='new'){
                this.video = new Video(null, null, 'Youtube', 0, 'YES');
                this.buildForm(this.video);
            }else{
                this._videoService.getFirstByChapter(6).subscribe(
                    (data)  =>  {
                                  this.videoList = data.context.audiovisuals.content;
                                  this._videoService.videoListSource.next(this.videoList);

                                  this.video =data.context.audiovisual;
                                  this.buildForm(this.video);
                                  console.log(this.videoList);
                                },
                    (error) => console.log(error),
                    //S()      => alert('all done')
                );

            }
          });

  }



  onVideoLinkChange(){
    if(!this.form)
      return;
    var provider = this.form.controls.provider.value;
    var stringURL = this.form.controls.link.value;
    var videoURL = this.form.controls.link.value;
    if(stringURL == null)
      return;

    var videoContainer = document.getElementById("video-display");
    var iframe = document.createElement('iframe');
    if(provider == 'Youtube'){
      var splitURL = stringURL.split("=");
      videoURL = "https://www.youtube.com/embed/"+splitURL[splitURL.length -1];
    }
    iframe.setAttribute('src', videoURL);
    iframe.setAttribute('frameborder', "5px");
    iframe.setAttribute('height', "400px");
    iframe.setAttribute('width', "100%");
    iframe.setAttribute('allowfullscreen', 'true');
    videoContainer.innerHTML = "";
    videoContainer.appendChild(iframe);

  }

  responseDecoder(value: string, field?:string){
    if((value != null && value=="RESTRICTED") || (value == 'YES')){
      return true;
    }else{
      return false;
    }
  }

  onFormSubmit(form){
      if(!isNaN(form.id) && form.id != 0){
          //alert("video update");
          this._videoService.update(this.extractFormData(form)).subscribe(
            (data) => console.log(data),
            (error) => console.log("error occured"),
            () => alert("all is done")
          );
      }else{
          //alert("new video");
          this._videoService.add(this.extractFormData(form)).subscribe(
            (data) => console.log(data),//update this seciton for page redirect after courase is created
                                        //this is to ensure that the address location always points to the object being displayed
            (error) => console.log("error occured"),
            () => alert("all is done")
          );
      }
   }

   extractFormData(form){
     let video = new Video();
     video.topicId    = 6;
     video.id         = form.id;
     video.provider   = form.provider;
     video.title      = form.title;
     video.link       = form.link
     video.weight     = form.weight;

     if(form.published == true)
       video.published = "YES";
     else
       video.published = "NO";

       if(form.visibility == true)
       video.visibility = "RESTRICTED";
     else
       video.visibility = "PUBLIC";

     console.log(video);
     return video;
   }

}
