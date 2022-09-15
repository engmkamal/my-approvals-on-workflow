
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
    constructor(public payload:any) { }
}

export class ToggleControls implements Action {
    readonly type = GridActionTypes.TOGGLE_CONTROLS;
    constructor() { 
        console.log("constructor of ToggleControls initialized !!");
    }
}

export class DeleteRowAction implements Action {
    readonly type = GridActionTypes.DELETE_ROW;
    constructor(public payload:any) { }
}
export class DeleteBatchRows implements Action {
    readonly type = GridActionTypes.DELETE_BATCH_ROWS;
    constructor(public payload: []) { }
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
