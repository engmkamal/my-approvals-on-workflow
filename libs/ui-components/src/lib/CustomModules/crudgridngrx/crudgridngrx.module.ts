import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudgridngrxComponent } from '../crudgridngrx/crudgridngrx/crudgridngrx.component';

import { AngularmaterialModule } from '../../angularmaterial.module';
// import {FileUploadModule} from 'primeng/fileupload';

// import {ToastModule} from 'primeng/toast';
// import {ButtonModule} from 'primeng/button';
// import {TabViewModule} from 'primeng/tabview';
import { EditableCellRendererComponent } from './editable-cell-renderer/editable-cell-renderer.component';
import { AgGridModule } from 'ag-grid-angular';
import { StoreModule } from '@ngrx/store';
import { GridReducer } from './grid-store/reducers/grid.reducer';

@NgModule({
  declarations: [
    CrudgridngrxComponent,
    EditableCellRendererComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    
    ReactiveFormsModule,
    AngularmaterialModule,
    AgGridModule,
    //AgGridModule.withComponents([EditableCellRendererComponent]),     
    StoreModule.forRoot({
      grid: GridReducer
    }),    
    // FileUploadModule,
    // ToastModule,
    // ButtonModule,
    // TabViewModule,
  ],
  exports: [
    CrudgridngrxComponent
  ]
})
export class CrudgridngrxModule { }
