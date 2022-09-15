import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'portal-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {
  userName = '';
  customerId = '';
  password = '';


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log("UserloginComponent ngOnInit initialized ");
  }

 

  login(): void {
    this.userService.checkCredentials(this.userName, this.customerId, this.password);
    //this.userService.login(this.userName, this.customerId, this.password);
  }

  logout(): void {
    this.userService.logout();
  }

}
