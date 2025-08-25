import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user: any;
  editForm: FormGroup;
  isEditing = false;
  errorMessage = '';

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.user = this.auth.getActiveUser();

    this.editForm = this.fb.group({
      name: [this.user?.name, [Validators.required, Validators.minLength(3)]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      phone: [
        this.user?.phone || '',
        [Validators.required, Validators.minLength(10)],
      ],
      address: [this.user?.address || '', Validators.required],
      bio: [this.user?.bio || ''],
      avatar: [this.user?.avatar || 'assets/default-avatar.png'],
      password: [''],
    });
  }

  enableEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editForm.patchValue({
      name: this.user?.name,
      email: this.user?.email,
      phone: this.user?.phone,
      address: this.user?.address,
      bio: this.user?.bio,
      avatar: this.user?.avatar,
      password: '',
    });
    this.errorMessage = '';
  }

  saveChanges() {
    if (this.editForm.valid) {
      // clone form values
      const updatedData: any = { ...this.editForm.value };

      // remove password if empty
      if (!updatedData.password) delete updatedData.password;

      // ensure email stays the same
      updatedData.email = this.user.email;

      const success = this.auth.updateUser(updatedData, this.user.email);

      if (success) {
        this.user = this.auth.getActiveUser(); // refresh local copy
        this.isEditing = false;
        alert('Profile updated successfully ✅');
      } else {
        this.errorMessage = 'Profile update failed!';
      }
    }
  }

  logout() {
    this.auth.logout();
  }


  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editForm.patchValue({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
