// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   imports: [CommonModule],
// })
// export class UiModule {}
//==================================
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { ResizableComponent } from './resizable/resizable.component';

import {
  //UtilsModule,
  AngularmaterialModule,
  // AccordionLinkDirective,
  // AccordionDirective,
  // AccordionAnchorDirective
} from '@portal/utils';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { ResizableModule } from 'angular-resizable-element';
import { AngularResizeEventModule } from 'angular-resize-event';
import { DragndresizableComponent } from './dragndresizable/dragndresizable.component';
import { DragresizelogolinktileComponent } from './dragresizelogolinktile/dragresizelogolinktile.component';
//import { ResizableanysideComponent } from './resizableanyside/resizableanyside.component';

@NgModule({
  imports: [
    CommonModule,
    AngularmaterialModule,
    FormsModule,
    //HttpClientModule,
    ReactiveFormsModule,
    ResizableModule,
    AngularResizeEventModule,
  ],
  declarations: [
    //ResizableComponent,
    DragndresizableComponent,
    DragresizelogolinktileComponent,
    //ResizableanysideComponent,
  ],
  exports: [
    //ResizableComponent,
    DragndresizableComponent,
    DragresizelogolinktileComponent,
    //ResizableanysideComponent,
  ],
})
export class UiModule {}
