import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.scss']
})
export class AppIndexComponent implements OnInit {
  
  loggedInUser: User | null = null
  constructor(private userService: UserService) {} 

  ngOnInit(): void {
    this.loggedInUser = this.userService.getUser()
  }
}
