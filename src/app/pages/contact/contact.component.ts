import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('📝 Contact Form Data:', this.contactForm.value);
      alert('✅ Message Sent! (Check console)');
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  sendEmail(form: any) {
    if (form.valid) {
      emailjs
        .send(
          'service_g31enas', // 🔹 Replace with your EmailJS Service ID
          'template_75bo5i6', // 🔹 Replace with your EmailJS Template ID
          {
            from_name: form.value.from_name,
            reply_to: form.value.reply_to,
            subject: form.value.subject,
            message: form.value.message,
          },
          'C710QmoAQpHRQSJ1r' // 🔹 Replace with your EmailJS Public Key
        )
        .then(
          (response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('✅ Your message has been sent successfully!');
            form.reset(); // clear form after send
          },
          (err) => {
            console.error('FAILED...', err);
            alert('❌ Failed to send message. Please try again.');
          }
        );
    }
  }
}
