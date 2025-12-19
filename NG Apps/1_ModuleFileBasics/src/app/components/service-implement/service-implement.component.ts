import { Component, inject } from '@angular/core';
import { DemoServiceService } from '../../Services/demo-service.service';

@Component({
  selector: 'app-service-implement',
  standalone: false,
  templateUrl: './service-implement.component.html',
  styleUrl: './service-implement.component.css',
})
export class ServiceImplementComponent {
  public ExArray: any[] = [];

  private getServiceData = inject(DemoServiceService);

  callService() {
    this.ExArray = this.getServiceData.getStudents();
  }

  public ApiDataArray: any[] = [];
  ApiService() {
    debugger;
    this.getServiceData.callApi().subscribe((data) => {
      this.ApiDataArray = data;
      console.log(this.ApiDataArray);
    });
  }
}
