import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
declare var AOS: any;
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'milk-project';
  ngOnInit() {
    AOS.init({
      duration: 1000, // animation duration
      once: true, // animation happens only once
    });
  }
}
