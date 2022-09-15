import { Component, OnInit } from '@angular/core';
import { UserService } from '@portal/shared/data-access-user';

@Component({
  selector: 'portal-loginhome',
  templateUrl: './loginhome.component.html',
  styleUrls: ['./loginhome.component.scss'],
})
export class LoginhomeComponent implements OnInit {

  customerId = '';
  username = '';
  password = '';

  isLoggedIn$ = this.userService.isUserLoggedIn$;

  constructor(private userService: UserService) {}

  login() {
    this.userService.checkCredentials(this.username, this.customerId, this.password);
  }  

  ngOnInit(): void {console.log("LoginhomeComponent ngOnInit");}
}
