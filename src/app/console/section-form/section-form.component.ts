import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/Router';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.css']
})
export class SectionFormComponent implements OnInit {
    form: FormGroup;
    formBuilder: FormBuilder = new FormBuilder();
    sectionComponents: FormArray;
    componentAddType: string;
    componentTypes:any[] = ['text', 'heading', 'image', 'file', 'code', 'note', 'link'];
    constructor() { }

    ngOnInit() {
      this.buildForm();
    }

    private buildForm(){
      this.form  = this.formBuilder.group({
        id: new FormControl(),
        title: new FormControl(),
        published: new FormControl(),
        visibility: new FormControl(),
        componentAddType: new FormControl(),
        components: this.formBuilder.array([ this.createComponent('text') ])
      });
    }

    createComponent(comp): FormGroup {
      return this.formBuilder.group({
        componentValue: new FormControl(),
        componentWeight: new FormControl(),
        componentType: new FormControl(comp)
      });
    }

    addComponentBefore(index){
      this.sectionComponents = this.form.get('components') as FormArray;
      this.sectionComponents.insert(index, this.createComponent('text'));
    }

    addComponent(): void {
       var selectedValue = this.form.controls.componentAddType.value;
       if(selectedValue == "null")
         return;
       this.sectionComponents = this.form.get('components') as FormArray;
       this.sectionComponents.push(this.createComponent(selectedValue));
       this.form.controls.componentAddType.setValue("null");
     }

     removeComponent(index){
       this.sectionComponents = this.form.get('components') as FormArray;
       this.sectionComponents.removeAt(index);
     }

     switchComponentType(index){
       //var components = this.form.get('components') as FormArray;
       //var fieldValue = components.controls[index] as FormGroup;

     }

}
