import { Component } from '@angular/core';

@Component({
  selector: 'adyd-error-404',
  styleUrl: './adyd-error-404.css',
  templateUrl: './adyd-error-404.html',
  standalone: true,
})
export class AdydError404 {
  redirectToHome() {
    window.location.href = '/';
  }
}
