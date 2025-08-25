import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMessage = '';
   loginForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    const remembered = this.auth.getRememberedCredentials();

    this.loginForm = this.fb.group({
      email: [remembered.email, [Validators.required, Validators.email]],
      password: [remembered.password, [Validators.required, Validators.minLength(6)]],
      rememberMe: [!!remembered.email],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      const success = this.auth.login(email, password, rememberMe);

      if (success) {
        this.router.navigate(['/']); // go home
      } else {
        alert('Invalid credentials or please sign up first.');
      }
    }
  }

}
