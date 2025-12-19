import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CoursesComponent } from '../courses/courses.component';
import { Strings } from '../../../enum/strings.enum';
import { Course } from '../../../interfaces/course.interface';
import { CourseService } from '../../../services/course/course.service';

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
    // this.getcourses();
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

  // model: any = {}; //aa nai aapso to initial value nai mlse
  // cover!: string; // "!" means that this field can be null
  // cover_file: any;
  // imageFlag = false;

  model = signal<any>({}); //changed becasue of signal
  cover = signal<string | null>(null);
  cover_file = signal<any>(null);
  imageFlag = signal<boolean>(false);

  onFileSelected(event: any) {
    console.log(event);
    const file = event.target.files[0];
    if (file) {
      this.cover_file = file;

      //image preview
      const reader = new FileReader();
      // console.log(reader);

      reader.onload = () => {
        const dataUrl = reader.result!.toString();
        // this.cover = dataUrl;
        this.cover.set(dataUrl); ///changed becasue of signal
        console.log('image: ', this.cover);
      };
      reader.readAsDataURL(file);
      // this.imageFlag = false;
      this.imageFlag.set(false); //changed becasue of signal
    }
  }

  onSubmit(form: NgForm) {
    //NOTE : NgForm
    if (form.invalid || !this.cover) {
      console.log('form data misssing!');
      form.control.markAllAsTouched(); //NOTE : shows errors when submit the form directly and without fillng field

      if (!this.cover) {
        // this.imageFlag = true;
        this.imageFlag.set(true); //changed becasue of signal
      }
      return;
    }
    // const data: Course = {
    //   ...form.value,
    //   id: this.courses.length + 1,
    //   image: this.cover,
    // };
    // this.courses = [...this.courses, data];
    // this.setDataInLocal(this.courses);

    console.log('form.value: ', form.value); //{title: 'first', description: 'this is first', image: 'C:\\fakepath\\browser f12.png'}
    this.saveCourse(form);

    form.reset();
    // this.cover = '';
    this.cover.set(''); //changed becasue of signal
  }
  async saveCourse(form: NgForm) {
    try {
      const formValue = form.value;
      //   console.log('formValue: ', formValue); //{title: 'first', description: 'this is first', image: 'C:\\fakepath\\browser f12.png'}
      const data: Course = {
        ...formValue,
        // image: this.cover,
        image: this.cover(), // aa ek func trike pass thti htti tethi pachhal () mukvathi as a value pass thse
      };
      await this.courseService.addCourse(data);
      form.reset();
      // this.cover = '';
      this.cover.set(''); //changed becasue of signal
    } catch (e) {
      console.log(e);
    }
  }
  private courseService = inject(CourseService);

  // this.courseService.addCourse(data);
  //courses show krva
  // courses: Course[] = [];

  // getcourses() {
  //   //jetla save 6 already ene btava...aa func ngOnInIt ma muki do etle direct call thy jai
  //   const data = localStorage.getItem(Strings.STORAGE_KEY);
  //   console.log(data);
  //   if (data) {
  //     this.courses = JSON.parse(data);
  //   }
  // }

  // setDataInLocal(data: any) {
  //   // debugger;
  //   localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(data));
  //   //"Strings.STORAGE_KEY" --> means that bdha data aa key saate store thse localstorage ma.
  //   //jyare data get krva hoi tyare khali aa key nu name nakhta e key sathena bdha data gett thy jse
  // }

  // saveCourse(formValue: any) {
  //   debugger;
  //   console.log('formValue: ', formValue); //{title: 'first', description: 'this is first', image: 'C:\\fakepath\\browser f12.png'}

  //   const data = {
  //     //formValue ma title and dscription j mlse tema image path leva mate aa krvu pdse
  //     ...formValue,
  //     image: this.cover,
  //     id: this.courses.length + 1,
  //   };
  //   debugger;
  //   this.courses = [...this.courses, data];
  //   this.setDataInLocal(this.courses);
  //   console.log('Courses details: ', this.courses);
  // }

  //delete button functions
  // delete_item(item: any) {
  //   this.courses = this.courses.filter(
  //     (course_name) => course_name.id != item.id
  //   );
  //   this.setDataInLocal(this.courses);
  // }
}
