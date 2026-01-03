import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StudentDataService } from '../../../Services/student-data.service';
import { Student } from '../../../interfaces/student.interface';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentSignalrService } from '../../../Services/student-signalr.service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {
  @ViewChild('studentName') Fname!: ElementRef<HTMLInputElement>; //NOTE @VIEWCHILD

  TotalStudents: Student[] = [];

  isEditMode = false;
  selectedFile: any;
  photoBase64: string | null = null;

  private studentService = inject(StudentDataService);

  private route = inject(ActivatedRoute);
  private signalr = inject(StudentSignalrService);

  studentModal?: Student;

  studentForm = new FormGroup({
    grNum: new FormControl(0, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    age: new FormControl(0, [Validators.required]),
    std: new FormControl(0, [Validators.required]),
  });

  onPhotoselected(event: any) {
    // this.selectedFile = event.target.files?.[0];
    const file = event.target.files?.[0];

    if (!file) {
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.photoBase64 = reader.result!.toString();
      };
    }
  }

  openAddModal() {
    this.isEditMode = false;
    this.studentForm.reset();
  }

  openEditModal(student: Student) {
    this.isEditMode = true;
    this.studentModal = student;
    // console.log(this.studentModal);

    this.studentForm.patchValue({
      //NOTE THIS patchvalue
      grNum: this.studentModal.grNumber,
      name: this.studentModal.sname,
      gender: this.studentModal.sgender,
      age: this.studentModal.sage,
      std: this.studentModal.sstd,
    });
    this.photoBase64 = this.studentModal.sphoto;

    //extra
    this.studentForm.get('grNum')?.disable();
    setTimeout(() => {
      this.Fname.nativeElement.focus();
    }, 500);
  }

  saveStudent() {
    const data: Student = {
      sphoto: this.photoBase64 ?? '',
      grNumber: this.studentForm.getRawValue().grNum ?? 0,
      sage: this.studentForm.value.age ?? 0,
      sgender: this.studentForm.value.gender ?? '',
      sname: this.studentForm.value.name ?? '',
      sstd: this.studentForm.value.std ?? 0,
    };
    if (
      this.isEditMode &&
      this.studentForm.getRawValue().grNum &&
      this.studentForm.valid
    ) {
      this.studentService.EditStudent(data.grNumber, data).subscribe({
        next: (res) => {
          if (res) {
            const selectedInedex = this.TotalStudents.findIndex(
              (x) => x.grNumber === data.grNumber
            );
            if (selectedInedex != -1) {
              this.TotalStudents[selectedInedex] = res;
            }
            this.studentForm.reset();
          }
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else {
      this.studentService.AddStudent(data).subscribe({
        next: (res) => {
          this.TotalStudents.push(res);
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  delete(id: number) {
    if (confirm('Are you sure that you want to delete this record?')) {
      this.studentService.DeleteStudent(id).subscribe({
        next: (res) => {
          const selectedInedex = this.TotalStudents.findIndex(
            (x) => x.grNumber === id
          );
          if (selectedInedex != -1) {
            this.TotalStudents.splice(selectedInedex, 1);
          }
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
  closeModal() {
    this.studentForm.reset();
  }

  ngOnInit(): void {
    // only if we need to call the api directly when Component loads then we need to do like this
    // this.studentService.getStudent().subscribe({
    //   next: (data) => {
    //     this.TotalStudents = data
    //     console.log(data);
    //   },
    //   error: (error) => {
    //     alert(error);
    //   },
    // });

    //this is using the resolver method
    this.route.data.subscribe((res) => {
      //note that we have to take here: this.route.data
      this.TotalStudents = res['students'];
    });

    this.signalr.startConnection();

    this.signalr.onStudentChanged((data) => {
      debugger;
      if (data) {
        const selectedInedex = this.TotalStudents.findIndex(
          (x) => x.grNumber === data.grNumber
        );
        if (selectedInedex != -1) {
          this.TotalStudents[selectedInedex] = data;
        } else {
          this.TotalStudents.push(data);
        }
      }
    });
    this.signalr.onStudentDeleted((grNumber) => {
      debugger;
      if (grNumber) {
        const selectedInedex = this.TotalStudents.findIndex(
          (x) => x.grNumber === grNumber
        );
        if (selectedInedex != -1) {
          this.TotalStudents.splice(selectedInedex, 1);
        }
      }
    });
  }
}
