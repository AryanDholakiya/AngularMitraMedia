import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CoursesComponent } from '../courses/courses.component';
import { Strings } from '../../../enum/strings.enum';

type model = {
  title: string;
  description: string;
};
@Component({
  selector: 'app-admin',
  imports: [FormsModule, CommonModule, CoursesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  ngOnInit() {
    this.getcourses();
  }
  // model: model = {
  //   title: 'heyy',
  //   description: 'hello',
  // };

  // we can intialize like this intead of making type
  // model = {
  //   title: 'heyy',
  //   description: 'hello',
  // }

  model: any = {}; //aa nai aapso to initial value nai mlse
  cover!: string; // "!" means that this field can be null
  cover_file: any;
  imageFlag = false;

  onFileSelected(event: any) {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      this.cover_file = file;

      //image preview
      const reader = new FileReader();
      console.log(reader);

      reader.onload = () => {
        const dataUrl = reader.result!.toString();
        this.cover = dataUrl;
        console.log('image: ', this.cover);
      };
      reader.readAsDataURL(file);
      this.imageFlag = false;
    }
  }

  onSubmit(form: NgForm) {
    //NOTE : NgForm
    if (form.invalid || !this.cover) {
      console.log('form data misssing!');
      form.control.markAllAsTouched(); //NOTE

      if (!this.cover) {
        this.imageFlag = true;
      }
      return;
    }
    console.log('form.value: ', form.value); //{title: 'first', description: 'this is first', image: 'C:\\fakepath\\browser f12.png'}
    this.saveCourse(form.value);

    form.reset();
    this.cover = '';
  }

  //courses show krva
  courses: any[] = [];

  getcourses() {
    //jetla save 6 already ene btava...aa func ngOnInIt ma muki do etle direct call thy jai
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    console.log(data);
    if (data) {
      this.courses = JSON.parse(data);
    }
  }

  saveCourse(formValue: any) {
    // debugger;
    console.log('formValue: ', formValue); //{title: 'first', description: 'this is first', image: 'C:\\fakepath\\browser f12.png'}

    const data = {
      //formValue ma title and dscription j mlse tema image path leva mate aa krvu pdse
      ...formValue,
      image: this.cover,
      id: this.courses.length + 1,
    };

    this.courses = [...this.courses, data];
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(this.courses));
  }
}
