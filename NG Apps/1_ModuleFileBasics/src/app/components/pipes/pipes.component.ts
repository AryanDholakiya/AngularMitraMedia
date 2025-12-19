import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pipes',
  standalone: false,
  templateUrl: './pipes.component.html',
  styleUrl: './pipes.component.css',
})
export class PipesComponent {
  // @Input() somearray: string[] = []; //Home component is parent component////just example that we can pass the array and obj from parent using @input
  PipeExampleVar = 'exampleS of PIPES.';

  //json pipe
  jsonPipeExVar = {
    name: 'abcd',
    age: 23,
    role: 'data analyst',
  };

  //date pipe
  dataPipeEx = new Date();

  months: string[] = ['jan', 'feb', 'march', 'apr', 'may'];
}
