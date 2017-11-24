import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/Router';


import { Question } from '../../entities/question';
import { QuestionService } from '../../services/question.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  form: FormGroup;
  formBuilder: FormBuilder = new FormBuilder();
  qComponents: FormArray;
  qResponses: FormArray;
  responseCount: string = 'single';
  operation: string = 'Form';
  //componentAddType: string;
  questionList: any;
  question: Question;
  componentTypes:any[] = ['TEXT', 'IMAGE', 'DOCUMENT', 'CODE'];
  constructor(private _questionService:QuestionService,
              private _courseService: CourseService,
              private _route:ActivatedRoute) { }

  ngOnInit() {
    this.loadQuestion();
  }


  loadQuestion(){
      //this._courseService.contentDisplaySource.next('question');
      this._courseService.contentDisplaySource.next('Questions');
      let sub = this._route.params.subscribe(params => {
          if(!isNaN(params['questionId'])){

                this._questionService.get(params['questionId']).subscribe(
                    (data)    =>{

                                  this.question = data.context.question;
                                  this.buildForm(this.question);

                                  this.questionList = data.context.questions.content;
                                  this._questionService.questionListSource.next(this.questionList);

                                  this.qComponents = this.form.get('components') as FormArray;
                                  for(let i = 0; i < this.question.components.length; i++){
                                      this.qComponents.push(this.createComponent(this.question.components[i]));
                                  }

                                  this.qResponses = this.form.get('responses') as FormArray;
                                  this.question.responses = data.context.question.answers;
                                  for(let i = 0; i < this.question.responses.length; i++){
                                      this.qResponses.push(this.createResponse(this.question.responses[i]));
                                  }
                                  console.log(data.context.question.answers);
                                },
                    (error)   =>console.log(error)
                )

                this.question = new Question(null, null, 'easy', 'QUIZ', 'MCQ', 'single', 2);
                this.buildForm(this.question);
                 //this.buildForm(this.question);

            }else if(params['new'] && params['new']=='new'){

                this.question = new Question(null, null, 'easy', 'QUIZ', 'MCQ', 'single', 2);
                this.buildForm(this.question);
            }else{
                //this._questionService.getFirstByChapter(6).subscribe(

                //);
                this._questionService.getFirstByChapter(1).subscribe(
                    (data)    =>{

                                  this.question = data.context.question;
                                  this.buildForm(this.question);

                                  this.questionList = data.context.questions.content;
                                  this._questionService.questionListSource.next(this.questionList);

                                  this.qComponents = this.form.get('components') as FormArray;
                                  for(let i = 0; i < this.question.components.length; i++){
                                      this.qComponents.push(this.createComponent(this.question.components[i]));
                                  }

                                  this.qResponses = this.form.get('responses') as FormArray;
                                  this.question.responses = data.context.question.answers;
                                  for(let i = 0; i < this.question.responses.length; i++){
                                      this.qResponses.push(this.createResponse(this.question.responses[i]));
                                  }

                                },
                    (error)   =>console.log(error),
                    );
                this.question = new Question(null, null, 'easy', 'QUIZ', 'MCQ', 'single', 2);
                this.buildForm(this.question);

            }
          });

  }

  private buildForm(question){
    return this.form  = this.formBuilder.group({
      id: new FormControl(+question.id),
      question: new FormControl(question.question),
      difficulty: new FormControl(question.difficulty),
      totalScore: new FormControl(question.totalScore),
      type: new FormControl(question.type),
      visibility: new FormControl(question.visibility),
      componentAddType: new FormControl(),
      responseCount: new FormControl(question.responseCount),
      components: this.formBuilder.array([ ]),
      responses: this.formBuilder.array([ ]),
    });
  }

  createComponent(comp): FormGroup {
    return this.formBuilder.group({
      value: new FormControl(comp.value),
      weight: new FormControl(comp.weight),
      contentType: new FormControl(comp.contentType)
    });
  }

  createResponse(res): FormGroup {
    return this.formBuilder.group({
      answer: new FormControl(res.value),
      score: new FormControl(res.score),
      correct: new FormControl(res.correct),
    });
  }

  addComponentBefore(index){
    this.qComponents = this.form.get('components') as FormArray;
    this.qComponents.insert(index, this.createComponent('TEXT'));
  }

  addComponent(): void {
     var selectedValue = this.form.controls.componentAddType.value;
     if(selectedValue == "null")
       return;
     this.qComponents = this.form.get('components') as FormArray;
     this.qComponents.push(this.createComponent(selectedValue));
     this.form.controls.componentAddType.setValue("null");
   }

  addResponse(): void {
    this.qResponses = this.form.get('responses') as FormArray;
    var selectedValue = this.form.controls.responseCount.value;
    if(selectedValue == 'polar' && this.qResponses.length == 2)
      return;
    this.qResponses.push(this.createResponse(""));
  }
   removeComponent(index){
     this.qComponents = this.form.get('components') as FormArray;
     this.qComponents.removeAt(index);
   }

   removeResponse(index){
     this.qResponses = this.form.get('responses') as FormArray;
     this.qResponses.removeAt(index);
   }

   switchComponentType(index){
     var components = this.form.get('components') as FormArray;
     var subComponent = components.controls[index] as FormGroup;
     if(subComponent.controls.componentValue.value != null && subComponent.controls.contentType.value=='IMAGE'){
        alert("you will loose data");
        subComponent.controls.componentValue.setValue(null);
     }
   }

   formArrayClear(array:any=[], count){
     for(var i=array.length; i > count; i--){
        array.removeAt(i-1);
     }

   }

   adjustResponseSelectionType(){
     var selectedValue = this.form.controls.responseCount.value;
     this.qResponses = this.form.get('responses') as FormArray;
     if(selectedValue == 'polar' && this.qResponses.length > 2){
       this.formArrayClear(this.qResponses, 2);
       //this.qResponses.push(this.createResponse());
       //this.qResponses.push(this.createResponse());
     }else if(selectedValue == 'polar' && this.qResponses.length == 1){
       this.qResponses.push(this.createResponse(""));
     }
   }

   adjustResponseValueField(){
     var selectedValue = this.form.controls.type.value;
     this.qResponses = this.form.get('responses') as FormArray;
     if(selectedValue != 'MCQ'){
        this.formArrayClear(this.qResponses, 1);
      }else if(this.qResponses.length == 1){
        this.qResponses.push(this.createResponse(""));
      }


     //alert(selectedValue);
   }

   extractFormData(formData){
      let question = new Question();
      question.topicId    = 1;
      question.id         = formData.id;
      question.question   = formData.question;
      question.difficulty = formData.difficulty;
      question.visibility = formData.visibility;
      question.type       = formData.type;
      question.responseCount=formData.responseCount;
      question.totalScore = formData.totalScore;
      question.components = formData.components;
      question.responses   = formData.responses;
      if(this.form.value.responses.length == 1){
          this.form.value.responses[0].correct='YES';
          this.form.value.responses[0].score = formData.totalScore;
          question.visibility = 'ASSESSMENT';
        }
      //for(let i = 0; i < formData.responses.length; i++){
      //      console.log(formData.responses[i]);
      //  }
      return question;
   }

   resetCorrectAnser(index){
     this.qResponses = this.form.get('responses') as FormArray;
     for(let i = 0; i < this.form.value.responses.length; i++){
         if(i == index)
            continue;
         this.form.value.responses[i].correct = "NO";
         console.log(this.form.value.responses[i].correct);
     }
   }

   onFormSubmit(formData){
      if(!isNaN(formData.id) && formData.id != 0){
          this._questionService.add(this.extractFormData(formData)).subscribe(
              (data)    =>  {
                              console.log(data);
                            },
              (error)   =>  console.log(error),
              ()        =>  alert('all is well'));
       }else{
          this._questionService.update(this.extractFormData(formData)).subscribe(
              (data)    =>  {
                              console.log(data);
                            },
              (error)   =>  console.log(error),
              ()        =>  alert('all is well'));
       }
   }
}
