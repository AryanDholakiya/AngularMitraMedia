import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'app-home',
  imports: [ProgressBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public progress = 20;

  StudentData: any[] = [
    { StudentName: 'arav', RollNo: 1, result: 67 },
    { StudentName: 'arush', RollNo: 2, result: 90 },
    { StudentName: 'ayush', RollNo: 3, result: 98 },
    { StudentName: 'ayushi', RollNo: 4, result: 51 },
    { StudentName: 'bhim', RollNo: 5, result: 35 },
  ];
}
