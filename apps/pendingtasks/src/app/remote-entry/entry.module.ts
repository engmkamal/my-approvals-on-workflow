import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import {
  UtilsModule,
  AngularmaterialModule,
  // AccordionLinkDirective,
  // AccordionDirective,
  // AccordionAnchorDirective
} from '@portal/utils';

import { RemoteEntryComponent } from './entry.component';
//import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardshomeComponent } from './dashboardshome/dashboardshome.component';
import { MasterdetailsrendererComponent } from './masterdetailsrenderer/masterdetailsrenderer.component';
import { ParentdashboardlandingComponent } from './parentdashboardlanding/parentdashboardlanding.component';
import { ParentreportlandingComponent } from './parentreportlanding/parentreportlanding.component';
import { DelegatedtasksComponent } from './delegatedtasks/delegatedtasks.component';
import { PendingtasksComponent } from './pendingtasks/pendingtasks.component';
import { PendingTaskshomeComponent } from './pending-taskshome/pending-taskshome.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    RemoteEntryComponent,
    //NxWelcomeComponent,
    DashboardshomeComponent,
    MasterdetailsrendererComponent,
    ParentdashboardlandingComponent,
    ParentreportlandingComponent,
    DelegatedtasksComponent,
    PendingtasksComponent,
    PendingTaskshomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule,
    //AgGridModule.withComponents([]),
    //HttpClientModule,
    AngularmaterialModule,
    RouterModule.forChild([
      {
        path: ':id/report',
        component: ParentreportlandingComponent,
      },
      {
        path: ':id/renderer',
        component: MasterdetailsrendererComponent,
      },
      {
        path: ':id',
        component: ParentreportlandingComponent,
        //component: ParentdashboardlandingComponent,
      },
      {
        path: '',        
        component: PendingTaskshomeComponent,
        //component: DashboardshomeComponent,
        //component: DelegatedtasksComponent,
        //component: NxWelcomeComponent,
      },
    ])
  ],
  providers: [],
  exports: [RemoteEntryComponent],
})
export class RemoteEntryModule {}
