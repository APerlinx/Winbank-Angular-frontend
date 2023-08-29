import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  private router = inject(Router)

  isContactsRouteActive(): boolean {
    return this.router.url === '/contact'
 }
}
