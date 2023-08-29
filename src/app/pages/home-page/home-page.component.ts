import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  
  constructor(private userService: UserService,private router: Router) {}

  signup(name: string) {
    this.userService.signup(name)
    const isSuccess = true; 
    if (isSuccess) {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
