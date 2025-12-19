import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Employee {
  name: string;
  empId: number | null;
  email: string;
  gender: string;
  role: string;
  skills: string[];
}

@Component({
  selector: 'app-templated-driven',
  standalone: false,
  templateUrl: './templated-driven.component.html',
  styleUrl: './templated-driven.component.css',
})
export class TemplatedDrivenComponent {
  formInfo = {};
  SaveFormData(form: NgForm) {
    console.log(form.value);
    this.formInfo = form.value;
  }

  //two way binded template driven form
  Employee: Employee = {
    name: '',
    empId: null,
    email: '',
    gender: '',
    role: '',
    skills: [],
  };

  // submitted = false;
  changeBox(data: any) {
    let selectedVal = data.target.value;
    let selected = data.target.checked;

    if (selected) {
      this.Employee.skills.push(selectedVal);
    } else {
      let index = this.Employee.skills.indexOf(selectedVal);
      this.Employee.skills.splice(index, 1);
    }

    // console.log(this.Employee.skills);
  }
  TwowayBinded(form: NgForm) {
    // debugger;
    // this.submitted = true;
    if (form.valid && this.Employee.skills.length > 0) {
      // form.control.markAllAsTouched();

      const finaldata = {
        ...form.value,
        skills: this.Employee.skills,
      };

      console.log(form.value);
      console.log(finaldata);

      form.resetForm();
      this.Employee.skills = [];
    }
  }
}
