import {
    //ColDef,
    //GridReadyEvent,
    //ICellRendererParams,
    RowGroupingDisplayType,
  } from 'ag-grid-community';
import {
    ColDef,
    Grid,
    GridOptions,
    ICellRendererParams
} 
from "ag-grid-enterprise"; 


export interface ITablegrid {
    autoGroupColumnDef?: any;
    columnDefs?: ColDef | any;
    components?: any;
    defaultColDef?: any;
    frameworkComponents?: any;
    gridApi?: any;
    gridColumnApi?: any;
    gridOptions?: GridOptions;
    masterGridOptions?: any;
    modules?: any[]; 
    rowData?: any;    
    rowGroupPanelShow?: any;
    sideBar?: any;
    statusBar?: any;
    testData?: any;     
    detailCellRenderer?: any;   
    txtOfQuickSearchInpFld?: any;        
    rowNodeApi?:any;
    masterDetail?: boolean | any;
    rowSelection?:any;
    animateRows?: boolean | any;
    suppressDragLeaveHidesColumns?: boolean;
    groupUseEntireRow?: boolean | any;
    paginationPageSize?: number | any,
    floatingFilter?: boolean | any;
    cacheQuickFilter?: boolean | any;
    enableCharts?: boolean | any;
    enableRangeSelection?: boolean | any;
    suppressRowClickSelection?: boolean | any;
    editType?:any;
    groupDisplayType?: RowGroupingDisplayType | any;
    masterTblData?:any;
    rowHeight?: number | any;
    grid?: any;
}

//===============================================================
// import {
//     //ColDef,
//     //GridReadyEvent,
//     //ICellRendererParams,
//     RowGroupingDisplayType,
//   } from 'ag-grid-community';
// import {
//     ColDef,
//     Grid,
//     GridOptions,
//     ICellRendererParams,
    
// } 
// from "ag-grid-enterprise"; 

// // import {
// //     // Grid,
// //     // GridOptions,
// //     AllModules,
// //     RowGroupingModule
// // } 
// // from "@ag-grid-enterprise/all-modules"; 


// export interface ITablegrid {
//     autoGroupColumnDef?: any;
//     columnDefs?: any;
//     components?: any;
//     defaultColDef?: any;
//     frameworkComponents?: any;
//     gridApi?: any;
//     gridColumnApi?: any;
//     gridOptions?: GridOptions;
//     masterGridOptions?: any;
//     modules?: any[]; 
//     rowData?: any;    
//     rowGroupPanelShow?: any;
//     sideBar?: any;
//     statusBar?: any;
//     testData?: any;     
//     detailCellRenderer?: any;   
//     txtOfQuickSearchInpFld?: any;
//     rowNodeApi?:any;
//     masterDetail?: boolean | any;
//     rowSelection?:any;
//     animateRows?: boolean | any;
//     suppressDragLeaveHidesColumns?: boolean;
//     groupUseEntireRow?: boolean | any;
//     paginationPageSize?: number | any,
//     floatingFilter?: boolean | any;
//     cacheQuickFilter?: boolean | any;
//     enableCharts?: boolean | any;
//     enableRangeSelection?: boolean | any;
//     suppressRowClickSelection?: boolean | any;
//     editType?:any;
//     groupDisplayType?: RowGroupingDisplayType | any;
//     masterTblData?:any;
//     rowHeight?: number | any;
//     grid?: any;

// }
