import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  loggedInUser: User | null = null
  @Output() moveTo: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserService) {} 

  ngOnInit(): void {
    this.loggedInUser = this.userService.getUser()
  }

  moveToPage(page: string): void {
    this.moveTo.emit(page);
  }
}
