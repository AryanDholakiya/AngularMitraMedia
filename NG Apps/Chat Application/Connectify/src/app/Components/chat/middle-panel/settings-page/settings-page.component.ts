import { Component, inject } from '@angular/core';
import { ApiServiceService } from '../../../../../Services/api-service.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../../Services/theme.service';

@Component({
  selector: 'app-settings-page',
  standalone: false,
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  private api = inject(ApiServiceService);
  private Mode = inject(ThemeService);
  private router = inject(Router);

  userId!: number;

  profile = {
    username: '',
    email: '',
    mobile: '',
    profileImage: null as string | null,
    about: '',
  };

  isDarkMode = false;

  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId'));
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.isDarkMode = true;
    }
    this.loadProfile();
  }

  loadProfile() {
    this.api.getProfile(this.userId).subscribe((res: any) => {
      // console.log(res);
      this.profile.username = res.username;
      this.profile.email = res.email;
      this.profile.mobile = res.mobileNumber;
      this.profile.profileImage = res.profileImage;
      this.profile.about = res.about;
    });
  }

  toggleTheme() {
    debugger;
    if (this.isDarkMode) {
      this.isDarkMode = false;
      this.Mode.toggleTheme(false);
    } else {
      this.isDarkMode = true;
      this.Mode.toggleTheme(true);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/Login');
  }
}
