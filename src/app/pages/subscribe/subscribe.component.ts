import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-subscribe',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css',
})
export class SubscribeComponent {
  subscribeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.subscribeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      startDate: ['', [Validators.required]],
    });
  }

  increaseQty() {
    const current = this.subscribeForm.get('quantity')?.value || 1;
    this.subscribeForm.get('quantity')?.setValue(current + 1);
  }

  decreaseQty() {
    const current = this.subscribeForm.get('quantity')?.value || 1;
    if (current > 1) this.subscribeForm.get('quantity')?.setValue(current - 1);
  }

  onSubmit() {
    if (this.subscribeForm.valid) {
      console.log('✅ Subscription Data:', this.subscribeForm.value);
      alert('🎉 Subscription Successful!');
      this.subscribeForm.reset({ quantity: 1 });
    } else {
      this.subscribeForm.markAllAsTouched();
    }
  }
}
