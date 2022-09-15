// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'portal-crudgridngrx',
//   //standalone: true,
//   templateUrl: './crudgridngrx.component.html',
//   styleUrls: ['./crudgridngrx.component.scss']
// })
// export class CrudgridngrxComponent {

//   constructor() { }
// }
//=======================

//===============================
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AngularmaterialModule } from '../../../angularmaterial.module';
// import { AgGridModule } from 'ag-grid-angular';
// import { StoreModule } from '@ngrx/store';
// import { GridReducer } from '../grid-store/reducers/grid.reducer';
import { EditableCellRendererComponent } from '../editable-cell-renderer/editable-cell-renderer.component';


import { produce } from 'immer';
//import { QuantityCellRendererComponent } from './quantity-cell-renderer/quantity-cell-renderer.component';
// import {
//   AddRowAction,
//   DeleteRowAction,
//   UpdateRow,
//   ToggleRowEditable,
//   ToggleControls,
//   DeleteBatchRows,
//   IncreasePrice,
//   ToggleDisableRows,
//   LoadAdminColumnDefs,
//   LoadCustumerColumnDefs, ToggleGroupByCategory
// } from '../grid-store/actions/grid.actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';



import 'ag-grid-enterprise';

import { Observable, interval } from 'rxjs';
import { v4 as uuid } from 'uuid';

//=========== NgRx Actions starts ==================

import { Action } from '@ngrx/store';

export enum GridActionTypes {

    LOAD_ADMIN_COLUMN_DEFS = 'LOAD_ADMIN_COLUMN_DEFS',
    LOAD_CUSTUMER_COLUMN_DEFS = 'LOAD_CUSTUMER_COLUMN_DEFS',

    TOGGLE_GROUP_BY_CATEGORY = 'TOGGLE_GROUP_BY_CATEGORY',


    ADD_ROW = 'ADD_ROW',
    TOGGLE_CONTROLS = 'TOGGLE_CONTROLS',
    UPDATE_ROW = 'UPDATE_ROW',
    DELETE_ROW = 'DELETE_ROW',
    DELETE_BATCH_ROWS = 'DELETE_BATCH_ROWS',
    TOGGLE_ROW_EDITABLE = 'TOGGLE_ROW_EDITABLE',
    INCREASE_PRICE = 'INCREASE_PRICE',
    TOGGLE_DISABLE_ROWS = 'TOGGLE_DISABLE_ROWS'
}

export class LoadAdminColumnDefs implements Action {
    readonly type = GridActionTypes.LOAD_ADMIN_COLUMN_DEFS;
    constructor(public payload:any) { }
}

export class ToggleGroupByCategory implements Action {
    readonly type = GridActionTypes.TOGGLE_GROUP_BY_CATEGORY;
}

export class LoadCustumerColumnDefs implements Action {
    readonly type = GridActionTypes.LOAD_CUSTUMER_COLUMN_DEFS;
    constructor(public payload:any) { }
}


export class AddRowAction implements Action {
    readonly type = GridActionTypes.ADD_ROW;
    constructor(public payload:any) {console.log(); }
}

export class ToggleControls implements Action {
    readonly type = GridActionTypes.TOGGLE_CONTROLS;
    constructor() { 
        console.log("constructor of ToggleControls initialized !!");
    }
}

export class DeleteRowAction implements Action {
    readonly type = GridActionTypes.DELETE_ROW;
    constructor(public payload:any) {console.log(); }
}
export class DeleteBatchRows implements Action {
    readonly type = GridActionTypes.DELETE_BATCH_ROWS;
    constructor(public payload: []) {console.log(); }
}



export class UpdateRow implements Action {
    readonly type = GridActionTypes.UPDATE_ROW;
    constructor(public nodeId:any, public colId:any, public value:any) {console.log(); }
}

export class IncreasePrice implements Action {
    readonly type = GridActionTypes.INCREASE_PRICE;
    constructor(public payload: number) {console.log(); }
}

export class ToggleRowEditable implements Action {
    readonly type = GridActionTypes.TOGGLE_ROW_EDITABLE;
    constructor(public payload:any) {console.log(); }
}

export class ToggleDisableRows implements Action {
    readonly type = GridActionTypes.TOGGLE_DISABLE_ROWS;
    constructor(public payload: []) {console.log(); }
}

export type GridAction =
    AddRowAction |
    DeleteRowAction |
    UpdateRow |
    ToggleRowEditable |
    ToggleControls |
    DeleteBatchRows |
    IncreasePrice |
    ToggleDisableRows |
    LoadAdminColumnDefs |
    LoadCustumerColumnDefs |
    ToggleGroupByCategory
    ;

//-------------------- NgRx Action ends ----------

//========= NgRx reducer starts ==============

const initialState = {

    columnDefs: [],
    rowData: [
        // tslint:disable: max-line-length
        { id: uuid(), name: 'Coffee', category: 'drink', editable: true, quantity: 1, price: 15,  },
        { id: uuid(), name: 'Tea', category: 'drink', editable: true, quantity: 1, price: 15,  },
        { id: uuid(), name: 'Orange Juice', category: 'drink', editable: true, quantity: 1, price: 15,  },
        { id: uuid(), name: 'Onion rings', category: 'starter', editable: false, quantity: 5, price: 2,  },
        { id: uuid(), name: 'Chicken wings', category: 'starter', editable: false, quantity: 5, price: 2,  },
        { id: uuid(), name: 'spring rolls', category: 'starter', editable: false, quantity: 5, price: 2,  },
        { id: uuid(), name: 'Lasagna', category: 'main', editable: false, quantity: 10, price: 35,  },
        { id: uuid(), name: 'Pasta', category: 'main', editable: false, quantity: 10, price: 1,  },
        { id: uuid(), name: 'Risotto', category: 'main', editable: false, quantity: 10, price: 35,  },
        { id: uuid(), name: 'Cake', category: 'dessert', editable: false, quantity: 20, price: 23,  },
        { id: uuid(), name: 'Ice cream', category: 'dessert', editable: false, quantity: 20, price: 23,  },
        { id: uuid(), name: 'Cheese board', category: 'dessert', editable: false, quantity: 20, price: 23,  },
    ],
    enableControls: false,
    groupByCategory: false,
};


export function GridReducer(state = initialState, action:any) {
    switch (action.type) {
        case GridActionTypes.TOGGLE_GROUP_BY_CATEGORY: return toggleGrouppByCategory(state, action);
        case GridActionTypes.LOAD_ADMIN_COLUMN_DEFS: return loadAdminColumnDefs(state, action);
        case GridActionTypes.LOAD_CUSTUMER_COLUMN_DEFS: return loadCustumerAdminColumnDefs(state, action);
        case GridActionTypes.ADD_ROW: return addRow(state, action);
        case GridActionTypes.DELETE_ROW: return deleteRow(state, action);
        case GridActionTypes.DELETE_BATCH_ROWS: return deleteBatchRows(state, action);
        case GridActionTypes.UPDATE_ROW: return updateRow(state, action);
        case GridActionTypes.TOGGLE_ROW_EDITABLE: return toggleRowsEditable(state, action);
        case GridActionTypes.TOGGLE_CONTROLS: return toggleControls(state, action);
        case GridActionTypes.INCREASE_PRICE: return increasePrice(state, action);
        case GridActionTypes.TOGGLE_DISABLE_ROWS: return toggleDisableRows(state, action);
        default:
            return state;
    }
}



function toggleGrouppByCategory(state:any, action:any) {
    return produce((state:any, draftState:any) => {
        const toggled = !state.groupByCategory;
        draftState.groupByCategory = toggled;
        draftState.columnDefs.find((colDef:any) => colDef.colId === 'category').rowGroup = toggled;
    });
}



function loadAdminColumnDefs(state:any, action:any) {
    const component = action.payload;
    return {
        ...state,
        columnDefs: ADMIN_COLS(component)
    };
}

function loadCustumerAdminColumnDefs(state:any, action:any) {
    const component = action.payload;
    return {
        ...state,
        columnDefs: CUSTUMER_COLS(component)
    };
}


function addRow(state:any, action:any) {
    return {
        ...state,
        rowData: [
            action.payload,
            ...state.rowData
        ]
    };
}

function deleteRow(state:any, action:any) {
    const nodeIdToRemove = action.payload;
    const filteredData = state.rowData.filter((node:any) => node.id !== nodeIdToRemove);
    return {
        ...state,
        rowData: [
            ...filteredData
        ]
    };
}

function deleteBatchRows(state:any, action:any) {
    const nodeIdsToRemove: Array<any> = action.payload;
    const filteredData = state.rowData.filter((node:any) => {
        if (nodeIdsToRemove.includes(node.id)) { return false; }
        return true;
    });
    return {
        ...state,
        rowData: [
            ...filteredData
        ]
    };
}




function updateRow(state:any, action:any) {
    return produce((state:any, draftState:any) => {
        const indx = draftState.rowData.findIndex((data:any) => data.id === action.nodeId);
        draftState.rowData[indx][action.colId] = action.value;
    });
}

function toggleRowsEditable(state:any, action:any) {
    return produce((state:any, draftState:any) => {
        const indx = state.rowData.findIndex((data:any) => data.id === action.payload);
        draftState.rowData[indx] = { ...draftState.rowData[indx], editable: !draftState.rowData[indx].editable };
    });
}

function toggleControls(state:any, action:any) {
    return {
        ...state,
        enableControls: !state.enableControls
    };

}


function increasePrice(state:any, action:any) {
    const percentage = action.payload;
    return produce((state:any, draftState:any) => {
        draftState.rowData.forEach((row:any) => row.price =
            +Number(row.price + row.price * percentage / 100).toFixed(2)
        );
    });
}


function toggleDisableRows(state:any, action:any) {
    const ids: any = action.payload;

    if (ids.length === 0) {
        return state;
    }

    return produce((state:any, draftState:any) => {
        const rowsToToggle = draftState.rowData.filter((row:any) => ids.includes(row.id));
        const enable = !rowsToToggle[0].editable;

        rowsToToggle.forEach((row:any) => {
            row.editable = enable;
        });
    });

}




function ADMIN_COLS(comp:any) {
    return [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            colId: 'editable',
            width: 250,
            headerName: '',
            cellRenderer: 'editableCellRendererComponent',
            cellRendererParams: {
                toggleEditable: comp.onToggleEditable.bind(comp),
                deleteRow: comp.onDeleteRow.bind(comp),
            },
            field: 'editable',
            hide: false,
        },
        {
            colId: 'price',
            headerName: 'Price',
            field: 'price',
            valueFormatter: comp.currencyFormatter,
            editable: comp.editable,
        },
        {
            colId: 'quantity',
            headerName: 'Quantity',
            field: 'quantity',
            editable: comp.editable,

        },
        {
            colId: 'category',
            headerName: 'Category',
            field: 'category',
            enableRowGroup: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: { values: ['drink', 'starter', 'main', 'desert'] },
            editable: comp.editable,
            rowGroup: comp.groupByCategory,
            hide: false

        },
        {
            colId: 'id',
            field: 'id',
            hide: true,
        },
        {
            colId: 'name',
            headerName: 'Product Name',
            field: 'name',
            editable: comp.editable,
        },

        {

            colId: 'total',
            headerName: 'Total cost',
            aggFunc: 'sum',
            valueFormatter: comp.currencyFormatter,
            valueGetter: (params:any) => {
                if (!params.node.group) { return params.data.quantity * params.data.price; }
                return params.value;
            }
        },
    ];
}


function CUSTUMER_COLS(comp:any) {
    return [
        {
            colId: 'editable',
            minWidth: 220,
            headerName: 'actions',
            cellRenderer: 'editableCellRendererComponent',
            cellRendererParams: {
                toggleEditable: comp.onToggleEditable.bind(comp),
                deleteRow: comp.onDeleteRow.bind(comp)
            },
            field: 'editable',
            hide: true,
        },
        {
            colId: 'price',
            headerName: 'Price',
            field: 'price',
            valueFormatter: comp.currencyFormatter,
            editable: comp.editable,
        },

        {
            colId: 'quantity',
            headerName: 'Quantity',
            field: 'quantity',
            editable: comp.editable,
        },
        {
            colId: 'category',
            headerName: 'Category',
            field: 'category',
            enableRowGroup: true,
            hide: true,
            rowGroup: comp.groupByCategory
        },

        {
            colId: 'id',
            field: 'id',
            hide: true,
        },
        {
            colId: 'name',
            headerName: 'Product name',
            field: 'name',
            editable: comp.editable,
        },
        {
            colId: 'total',
            headerName: 'Total cost',
            aggFunc: 'sum',
            valueFormatter: comp.currencyFormatter,
            valueGetter: (params:any) => {
                if (!params.node.group) { return params.data.quantity * params.data.price; }
                return params.value;
            }
        },
    ];
}

//--------------ngRx reducer ends -------------



@Component({
  selector: 'portal-crudgridngrx',  
  templateUrl: './crudgridngrx.component.html',
  styleUrls: ['./crudgridngrx.component.scss']
  // standalone: true,
  // imports:[
  //   CommonModule,
  //   RouterModule,
  //   FormsModule,    
  //   ReactiveFormsModule,
  //   AngularmaterialModule,
  //   EditableCellRendererComponent,
  //   AgGridModule    
  // ],
})
export class CrudgridngrxComponent {

  rowData$: Observable<any>;
  columnDefs$: Observable<any>;
  enableControls$: Observable<any>;
  gridApi: any;
  columnApi: any;
  quickFilterValue = '';
  defaultColDef: any = {
    valueSetter: (params:any) => {
      let newVal = params.newValue;

      const isNaN = +params.newValue !== +params.newValue;

      if (typeof (+params.newValue) === 'number' && !isNaN) {
        newVal = +params.newValue;
      }

      const colId = params.colDef.colId;
      const nodeId = params.node.id;
      this.store.dispatch(new UpdateRow(nodeId, colId, newVal));
      return false;
    },
    resizable: true,
    cellStyle: {
      display: 'flex',
      'align-items': 'center'
    }
  };
  autoGroupColumnDef = {
    headerName: 'Category',
  };

  frameworkComponents: any = {
    editableCellRendererComponent: EditableCellRendererComponent,
    //quantityCellRendererComponent: QuantityCellRendererComponent
  };

  constructor(private store: Store<any>) {

    this.loadAdminColumnDefs();


    // this.rowData$ = this.store.select(store => store.grid.rowData);
    // this.columnDefs$ = this.store.select(store => store.grid.columnDefs);

    // this.enableControls$ = this.store.select(store => store.grid.enableControls);
      
    this.rowData$ = this.store.select(store => store.grid.rowData);
    this.columnDefs$ = this.store.select(store => store.grid.columnDefs);

    this.enableControls$ = this.store.select(store => store.grid.enableControls);

    this.enableControls$.subscribe(isEnabled => {
      if (isEnabled) {
        this.loadAdminColumnDefs();
      } else {
        this.loadCustumerColumnDefs();
      }
    });
  }









  loadAdminColumnDefs() {
    //const loadAdminColumnDefs = new LoadAdminColumnDefs(this);
    this.store.dispatch(new LoadAdminColumnDefs(this));
  }


  loadCustumerColumnDefs() {
    this.store.dispatch(new LoadCustumerColumnDefs(this));
  }


  // GRID CALLBACKS



  editable(params:any): boolean {
    if (!params.node.group) {
      return params.node.data.editable;
    }
    return false;
  }


  currencyFormatter(params:any) {
    if (!params.node.group) { return `$${params.value}`; }
    return params.value;
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.columnApi.autoSizeAllColumns();
  }


  getRowNodeId(data:any) {
    return data.id;
  }

  onFirstDataRendered(params:any) {
    params.api.sizeColumnsToFit();
  }

  onGridColumnsChanged(params:any) {
    params.api.sizeColumnsToFit();

  }

  getRowStyle(params:any) {
    if (!params.node.group) {
      if (!params.node.data.editable) {
        return {
          background: 'rgba(111,111,111,0.12)',
        };
      }

      return {
        background: 'white',
      };
    }else{
      return {
        background: 'white',
      };
    }
  }



  // LOCAL STATE CHANGE


  onQuickFilterInput(e:any) {
    this.gridApi.setQuickFilter(e.target.value);
  }

  // ACTIONS

  onGroup(e?:any) {
    this.store.dispatch(new ToggleGroupByCategory());
  }

  onAddRow(e?:any) {
    this.store.dispatch(new AddRowAction({
      id: uuid(),
      name: 'product',
      quantity: 0,
      price: 0,
      editable: true,
    }));
  }

  onToggleDisableSelectedRows(e?:any) {
    const nodeIds = this.gridApi.getSelectedNodes().map((node:any) => node.id);
    this.store.dispatch(new ToggleDisableRows(nodeIds));
  }


  onIncreasePrice(e?:any) {
    this.store.dispatch(new IncreasePrice(10));
  }

  onDeleteRow(nodeId:any) {
    this.store.dispatch(new DeleteRowAction(nodeId));
  }

  onToggleEditable(nodeId:any) {
    this.store.dispatch(new ToggleRowEditable(nodeId));
  }


  onToggleControls(e?:any) {
    this.store.dispatch(new ToggleControls());
  }

  onDeleteSelected(e?:any) {
    const nodeIds = this.gridApi.getSelectedNodes().map((node:any) => node.id);
    this.store.dispatch(new DeleteBatchRows(nodeIds));
  }

}






