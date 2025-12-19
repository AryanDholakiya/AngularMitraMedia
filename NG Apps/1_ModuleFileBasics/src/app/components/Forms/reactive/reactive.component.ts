import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  standalone: false,
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.css',
})
export class ReactiveComponent {
  emailRegex =
    /[A-Za-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/;

  mySkills: string[] = ['Angular', '.Net', 'react'];

  myform = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Age: new FormControl(null, [
      Validators.required,
      Validators.min(18),
      Validators.max(35),
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailRegex),
      // emailregex no data directly aama mukvu hoi to without string muki skay, bcz string ma / valid nthi. pn string quotes vgr chali jse
    ]),

    gender: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    accept: new FormControl(false, Validators.requiredTrue), //Note : Validators.requiredTrue
    Skills: new FormArray([], Validators.required),
  });

  formData() {
    // this.myform.get('Skills')?.setValue(this.mySkills);
    // const finalData = { ...this.myform.value, Skills: this.mySkills };

    console.log('old: ', this.myform.value);
    // console.log('new: ', finalData);
    this.myform.reset();
  }

  changeBox(eventData: any) {
    let selectedval = eventData.target.value;
    let selected = eventData.target.checked;

    const checkedArray = this.myform.get('Skills') as FormArray;

    if (selected) {
      checkedArray.push(new FormControl(selectedval));
    } else {
      let index: number = 0;
      checkedArray.controls.forEach((item) => {
        if (item.value == selectedval) {
          checkedArray.removeAt(index);
        }
        index++;
      });
    }
  }
}
