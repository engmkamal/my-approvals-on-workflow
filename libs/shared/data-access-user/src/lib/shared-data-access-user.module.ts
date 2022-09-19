import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { UserloginComponent } from './userlogin/userlogin.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpClientModule
  ],
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
