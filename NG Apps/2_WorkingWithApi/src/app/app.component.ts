import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StudentDataService } from '../Services/student-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'WorkingWithApi';

  private router = inject(Router);
  private authservice = inject(StudentDataService);

  //tocken localstorage mathi kadhi nakhie tyare logout button jttu rey and register login pachhu dekhay jai te mate
  @HostListener('window:storage')
  onStorageChange() {
    if (!localStorage.getItem('token')) {
      this.authservice.isLoggedIn.next(false); // logout setup //behaviour sub ma je true store thyu hoi te pachhu false krva
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }
}
