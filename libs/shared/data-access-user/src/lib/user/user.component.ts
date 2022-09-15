import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'portal-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  get userName(): string {
    return this.userService.userName;
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log("UserComponent ngOnInit initialized ");
  }

}
