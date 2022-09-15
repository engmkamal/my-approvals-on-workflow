import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { UserloginComponent } from './userlogin/userlogin.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    UserloginComponent,
    UserComponent
  ],
  exports: [
    UserloginComponent,
    UserComponent
  ],
})
export class SharedDataAccessUserModule {}
