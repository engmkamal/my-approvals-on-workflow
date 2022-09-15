import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttachmentprimenghomeComponent } from './attachmentprimenghome/attachmentprimenghome.component';
import { AngularmaterialModule } from '../../angularmaterial.module';
import {FileUploadModule} from 'primeng/fileupload';

import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [
    AttachmentprimenghomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    
    ReactiveFormsModule,
    AngularmaterialModule,
    FileUploadModule,
    ToastModule,
    ButtonModule,
    TabViewModule,
  ],
  exports: [
    AttachmentprimenghomeComponent
  ]
})
export class AttachmentprimengModule { }
