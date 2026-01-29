import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ApiServiceService } from '../../../../../Services/api-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-page',
  standalone: false,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private api = inject(ApiServiceService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  loggedInUser!: any;
  userId!: number;
  mobileNumber!: string;

  profileForm!: FormGroup;
  profileImage!: File | null;
  imagePreview: string | null = null;

  ngOnInit() {
    this.userId = Number(localStorage.getItem('userId'));

    this.loggedInUser = JSON.parse(localStorage.getItem('loggedIn_User') ?? '');
    this.mobileNumber = this.loggedInUser.mobileNumber;

    //edit profile
    this.profileForm = new FormGroup({
      username: new FormControl(this.mobileNumber),
      MobileNumber: new FormControl(this.mobileNumber),
      about: new FormControl('Busy...', [Validators.maxLength(200)]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
    });

    this.loadProfile();
  }

  loadProfile() {
    debugger;
    this.api.getProfile(this.userId).subscribe((res: any) => {
      console.log('after Load profile: ', res);
      this.profileImage = res.profileImage;
      this.imagePreview = res.profileImage
        ? 'data:image/png;base64,' + res.profileImage
        : null;
      this.profileForm.patchValue({
        username: res.username,
        email: res.email,
        about: res.about,
        MobileNumber: res.mobileNumber,
      });
    });
  }

  async selectProfilePic(event: any) {
    let profile = event.target.files[0];

    if (!profile) {
      return;
    }

    if (!profile.type.startsWith('image/')) {
      this.toastr.error('Selected file should be Image!', '', {
        positionClass: 'toast-top-left',
      });
      return;
    }

    try {
      const compressedFile = await this.compressImage(profile, 200, 200);
      this.profileImage = compressedFile;

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
    } catch (e) {
      console.log(e);
    }
  }

  onFileSelected(event: any) {}

  updateProfile() {
    debugger;
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('UserId', this.userId.toString());
    formData.append('Username', this.profileForm.value.username);
    formData.append('About', this.profileForm.value.about!);
    formData.append('Email', this.profileForm.value.email!);

    debugger;
    if (this.profileImage) {
      formData.append('ProfileImage', this.profileImage);
    } else {
      formData.append('ProfileImage', '');
    }

    this.api.updateProfile(formData).subscribe({
      next: (res: any) => {
        this.toastr.success('Profile set successfully');
        this.router.navigateByUrl('/chat');
        this.loadProfile();
        console.log('\n\n update profile response came:');
      },
      error: () => {
        this.toastr.error('Failed to update profile');
      },
    });
  }

  compressImage(
    file: File,
    maxWidth: number,
    maxHeight: number,
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Aspect ratio જાળવી રાખીને સાઈઝ નક્કી કરવી
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Canvas ને Blob માં ફેરવવું (Quality 0.7 એટલે કે 70%)
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              }
            },
            'image/jpeg',
            0.7,
          );
        };
      };
      reader.onerror = (error) => reject(error);
    });
  }
}
