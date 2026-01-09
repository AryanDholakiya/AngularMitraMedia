import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../../../Services/api-service.service';

@Component({
  selector: 'app-set-profile',
  standalone: false,
  templateUrl: './set-profile.component.html',
  styleUrl: './set-profile.component.scss',
})
export class SetProfileComponent implements OnInit {
  private api = inject(ApiServiceService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  MobileNumber: string = '';
  selectedImage!: File;
  imagePreview: string | null = null;
  profileForm!: FormGroup;

  //UserId must be stored after register / login
  userId = JSON.parse(localStorage.getItem('userId') || '{}');

  ngOnInit(): void {
    if (!this.userId) {
      this.router.navigate(['/Register']);
    }
    const UserData = JSON.parse(localStorage.getItem('loggedIn_User') || '{}');
    // console.log(UserData);
    this.MobileNumber = UserData.mobileNumber;
    console.log(this.MobileNumber);

    this.profileForm = new FormGroup({
      username: new FormControl(this.MobileNumber, [
        Validators.required,
        Validators.minLength(3),
      ]),
      about: new FormControl('Busy...', [Validators.maxLength(200)]),
    });
  }

  //Image preview function
  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    //NOTE
    if (!file.type.startsWith('image/')) {
      // console.log('file type: ', file.type);
      this.toastr.error('Only image files are allowed');
      return;
    }
    this.selectedImage = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      // console.log('image preview: ', this.imagePreview);
    };
  }

  setProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('UserId', this.userId.toString());
    formData.append('Username', this.profileForm.value.username!);
    formData.append('About', this.profileForm.value.about!);

    if (this.selectedImage) {
      formData.append('ProfileImage', this.selectedImage);
    } else {
      formData.append('ProfileImage', '');
    }

    this.api.updateProfile(formData).subscribe({
      next: (res: any) => {
        this.toastr.success('Profile set successfully');
        this.router.navigate(['/SendMessage']);
      },
      error: () => {
        this.toastr.error('Failed to update profile');
      },
    });
  }
}
