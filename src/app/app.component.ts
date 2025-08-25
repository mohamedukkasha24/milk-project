import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
declare var AOS: any;
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'milk-project';

   constructor(public auth: AuthService) {}

     logout() {
    this.auth.logout();
  }
}
