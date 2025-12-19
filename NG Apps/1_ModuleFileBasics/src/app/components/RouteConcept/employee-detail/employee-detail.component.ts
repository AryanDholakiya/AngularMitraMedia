import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpServiceService } from '../../../Services/EmpService.service';

@Component({
  selector: 'app-employee-detail',
  standalone: false,
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css',
})
export class EmployeeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  EmpId: number = 0;
  EmpName: string | null = '';

  ngOnInit(): void {
    // this.EmpId = Number(this.route.snapshot.paramMap.get('id'));
    // this.EmpName = this.route.snapshot.paramMap.get('name'); for this we have to change in "this.router.navigate(['/Employees-List', emp.empId]);" also.

    this.route.paramMap.subscribe((person) => {
      //better to use instead of snapshot //paramMap nu improved version
      this.EmpId = Number(person.get('id')); //agal Number etle mukvu pde bcz ParamMap thi aavto data string ma j hoi tene number ma get krvu pde
    });
  }

  constructor(private router: Router, public empSer: EmpServiceService) {}
  goToProduct(id: number) {
    this.router.navigate(['/Employees-List', id]);
  }

  NextId() {
    if (this.empSer.getMaxId() > this.EmpId) {
      let nextid = this.EmpId + 1;
      this.router.navigate(['/Employees-List', nextid]);
    }
  }
  PreviousId() {
    if (this.empSer.getMinId() < this.EmpId) {
      let previousid = this.EmpId - 1;
      this.router.navigate(['/Employees-List', previousid]);
    }
  }

  //<!-- optional route parameter example -->
  goback() {
    this.router.navigate(['/Employees-List', { id: this.EmpId }]);
  }
}
