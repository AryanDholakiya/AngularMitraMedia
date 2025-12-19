import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  standalone: false,
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent {
  NormalArray = ['ajay', 'vijay', 'sanjay'];

  employee = [
    { name: 'raju', age: 25, empId: 101 },
    { name: 'kaju', age: 26, empId: 102 },
    { name: 'viju', age: 24, empId: 103 },
  ];
}
