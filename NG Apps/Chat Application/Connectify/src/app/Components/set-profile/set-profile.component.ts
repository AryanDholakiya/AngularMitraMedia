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
  async onImageSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    //NOTE
    if (!file.type.startsWith('image/')) {
      // console.log('file type: ', file.type);
      this.toastr.error('Only image files are allowed');
      return;
    }

    try {
      // ઈમેજને 200x200 પિક્સેલમાં કોમ્પ્રેસ કરો
      const compressedFile = await this.compressImage(file, 200, 200);
      this.selectedImage = compressedFile;

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      // const objectUrl = URL.createObjectURL(compressedFile); instead of FileReader
      // this.imagePreview = objectUrl;
    } catch (error) {
      console.error('Compression error:', error);
    }
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

    debugger;
    if (this.selectedImage) {
      formData.append('ProfileImage', this.selectedImage);
    } else {
      formData.append('ProfileImage', '');
    }

    this.api.updateProfile(formData).subscribe({
      next: (res: any) => {
        debugger;
        console.log('Profile Image: ', res);
        this.toastr.success('Profile set successfully');
        this.router.navigate(['/chat']);
      },
      error: () => {
        this.toastr.error('Failed to update profile');
      },
    });
  }

  //to resolve the chatlist users dp warning :
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
