import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItserviceRoutingModule } from './itservice-routing.module';
//import { RouterModule } from '@angular/router';
import {
  UtilsModule,
  AngularmaterialModule,
  // AccordionLinkDirective,
  // AccordionDirective,
  // AccordionAnchorDirective
} from '@portal/utils';

import {
  UiModule
} from '@portal/ui';

import { ItservicehomeComponent } from './itservicehome/itservicehome.component';
import { GetstartedComponent } from './itservicehome/getstarted/getstarted.component';
import { ApprovalflowComponent } from './itservicehome/approvalflow/approvalflow.component';
import { ApplicationComponent } from './itservicehome/application/application.component';
import { SidebarComponent } from './itservicehome/sidebar/sidebar.component';
import { SpinnerComponent } from './itservicehome/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ResizableModule } from 'angular-resizable-element';
import { AngularResizeEventModule } from 'angular-resize-event';
//import { ResizableComponent } from './itservicehome/resizable/resizable.component';
//import { DragndresizeableComponent } from './itservicehome/dragndresizeable/dragndresizeable.component';

//import { FlexLayoutModule } from '@angular/flex-layout';
//import { ChartistModule } from 'ng-chartist';

//import { UiComponentsModule } from '@portal/ui-components';
import { RequestorComponent } from '@portal/ui-components';

@NgModule({
  declarations: [
    ItservicehomeComponent,
    GetstartedComponent,
    ApprovalflowComponent,
    ApplicationComponent,
    SidebarComponent,
    SpinnerComponent,
    //ResizableComponent,
    //DragndresizeableComponent,
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    //FlexLayoutModule,
    //ChartistModule,
    UtilsModule,
    UiModule,
    // AccordionLinkDirective,
    // AccordionDirective,
    // AccordionAnchorDirective,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ItserviceRoutingModule,
    ResizableModule,
    AngularResizeEventModule,
    //UiComponentsModule,
    RequestorComponent
  ],
  exports: [
    ItservicehomeComponent,
    GetstartedComponent,
    ApprovalflowComponent,
    ApplicationComponent,
    //UtilsModule,
    // AccordionLinkDirective,
    // AccordionDirective,
    // AccordionAnchorDirective
  ],
})
export class ItserviceModule {}
