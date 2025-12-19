import { Component, inject } from '@angular/core';
import { DemoServiceService } from '../../Services/demo-service.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public progressStatus = 30;

  //arr = ['raju', 'shyam', 'tiya']; //just example that we can pass the array and obj from parent using @input

  //service example;
  public demoArray: any[] = [];

  private demoService = inject(DemoServiceService);

  useService() {
    debugger;
    this.demoArray = this.demoService.getStudents();
  }
}
