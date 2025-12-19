import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpServiceService } from '../../../Services/EmpService.service';

@Component({
  selector: 'app-employees-list',
  standalone: false,
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css',
})
export class EmployeesListComponent implements OnInit {
  isSelectedId: any; // optional route parameter mate

  Emplist: User[] = [
    {
      name: 'jay',
      age: 22,
      empId: 101,
    },
    {
      name: 'sanjay',
      age: 23,
      empId: 102,
    },
    {
      name: 'Vijay',
      age: 22,
      empId: 103,
    },
    {
      name: 'Ajay',
      age: 21,
      empId: 104,
    },
    {
      name: 'ganjay',
      age: 22,
      empId: 105,
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empSer: EmpServiceService
  ) {}

  GotoEmp(emp: User) {
    this.empSer.setMinId(this.Emplist[0].empId);
    this.empSer.setMaxId(this.Emplist[this.Emplist.length - 1].empId);

    this.router.navigate(['/Employees-List', emp.empId]); //Meaning: "emp.empId" ne '/Employees-List' route sathe combine kro ane tena pr nevigate thy jao. // "Employees-List/:id" aavu route hse je component pase tema nevigate thse.
    console.log(emp);
  }

  //optional route understanding mate
  ngOnInit(): void {
    this.route.paramMap.subscribe((person) => {
      this.isSelectedId = person.get('id');
    });
  }
  isPrevious(emp: any) {
    return parseInt(emp.empId) === parseInt(this.isSelectedId);
  }
}
