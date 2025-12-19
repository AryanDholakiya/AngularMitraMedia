import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-child',
  standalone: false,
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  @Input() myArray: [] = []; //Here you are telling TypeScript: myArray is an array type that can only contain zero elements.You cannot push, cannot assign values, cannot receive values from parent.

  @Input() myArray1: any[] = [];
  //@Input() myArray2: any[] = []; // instead of giving "any[]" we can create an interface, which is best way
  @Input() myArray3: User[] = [];
}
