import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loadRemoteModule } from '@nrwl/angular/mf';

import { ApplicationComponent } from './itservicehome/application/application.component';
import { ApprovalflowComponent } from './itservicehome/approvalflow/approvalflow.component';
import { GetstartedComponent } from './itservicehome/getstarted/getstarted.component';
import { ItservicehomeComponent } from './itservicehome/itservicehome.component';

const routes: Routes = [
  {
    path: 'itservicerequest',
    loadChildren: () =>
      loadRemoteModule('itservicerequest', './Module').then(
        (m) => m.RemoteEntryModule
      ),
    // loadChildren: () =>
    //   import('itservicerequest/Module').then((m) => m.RemoteEntryModule)
  },
  {
    path: 'getstarted',
    component: GetstartedComponent
  },
  {
    path: 'approvalflow',
    component: ApprovalflowComponent
  },
  {
    path: '',
    component: ItservicehomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItserviceRoutingModule { }
