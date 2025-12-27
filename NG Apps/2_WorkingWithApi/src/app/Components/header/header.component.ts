import { Component, inject, Input, OnInit } from '@angular/core';
import { StudentDataService } from '../../../Services/student-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isTokenAvailable: boolean = false;

  private authservice = inject(StudentDataService);
  private router = inject(Router);
  private toaster = inject(ToastrService);

  ngOnInit(): void {
    this.authservice.isLoggedin$.subscribe((res) => {
      this.isTokenAvailable = res;
    });
    this.isTokenAvailable = Boolean(localStorage.getItem('token'));
  }

  logout() {
    this.authservice.isLoggedIn.next(false); // logout setup
    const user = localStorage.getItem('userName'); //logout time prr toaster ma username show krva
    // console.log(user);
    localStorage.clear();
    this.router.navigateByUrl('/login');

    this.toaster.warning(`${user} Successfully Logged Out`, `Logged Out!`, {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    });
  }
}
