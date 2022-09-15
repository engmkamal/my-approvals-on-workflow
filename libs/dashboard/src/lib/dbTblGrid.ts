// import {
//     Grid,
//     GridOptions,
//     AllModules
// } 
// from "@ag-grid-enterprise/all-modules"; 
//import { CellClickedEvent, ColDef, GridReadyEvent, GridOptions } from 'ag-grid-community';
import { GridOptions } from 'ag-grid-enterprise';

export interface ITablegrid {
    autoGroupColumnDef?: any;
    columnDefs?: any;
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

}


//import { ITablegrid } from '../interfaces/itablegrid';

export class Tablegrid2 implements ITablegrid{
    constructor(
        public autoGroupColumnDef?: any,
        public columnDefs?: any,
        public components?: any,
        public defaultColDef?: any,
        public frameworkComponents?: any,
        public gridApi?: any,
        public gridColumnApi?: any,
        public gridOptions?: any,
        public masterGridOptions?: any,
        public modules?: any, 
        public rowData?: any,
        public masterTblData?: any,
        public masterDetTblData?: any,    
        public rowGroupPanelShow?: any,
        public sideBar?: any,
        public statusBar?: any,
        public testData?: any,
        public detailCellRenderer?: any,    
        public txtOfQuickSearchInpFld?: any){
            this.defaultColDef = {
                flex: 1,
                minWidth: 120,
                resizable: true,
                enableValue: true,
                enableRowGroup: true,
                enablePivot: true,
                sortable: true,
                filter: true,
                //editable: true,
            };
        
            //===========for action btn link rendering start ===
            // this.frameworkComponents = {
            //     customizedAgeCell: LiactionbtncstmComponent,
            // };
            //--------for action btn link rendering start -------
            this.rowGroupPanelShow = 'always';
            
            this.sideBar = {
                toolPanels: [
                    'filters',
                    {
                        id: 'columns',
                        labelDefault: 'Columns',
                        labelKey: 'columns',
                        iconKey: 'columns',
                        toolPanel: 'agColumnsToolPanel',
                        toolPanelParams: {
                            suppressSyncLayoutWithGrid: true,
                            suppressRowGroups: true,
                            suppressValues: true,
                        },
                    },
                ],
                defaultToolPanel: 'filters',
            };
            this.statusBar = {
                statusPanels: [{
                        statusPanel: 'agTotalRowCountComponent',
                        align: 'left',
                        key: 'totalRowComponent',
                    },
                    {
                        statusPanel: 'agFilteredRowCountComponent',
                        align: 'left',
                    },
                    {
                        statusPanel: 'agSelectedRowCountComponent',
                        align: 'center',
                    },
                    {
                        statusPanel: 'agAggregationComponent',
                        align: 'right',
                    },
                ],
            };
      
            this.components = {
                datePicker: getDatePicker()
            };
        }
}

function getDatePicker() {
    function Datepicker() {console.log("");}
    Datepicker.prototype.init = function(params: any) {
        this.eInput = document.createElement('input');
        this.eInput.value = params.value;
        this.eInput.classList.add('ag-input');
        this.eInput.style.height = '100%';
        //$(this.eInput).datepicker({ dateFormat: 'dd/mm/yy' });
    };
    Datepicker.prototype.getGui = function() {
        return this.eInput;
    };
    Datepicker.prototype.afterGuiAttached = function() {
        this.eInput.focus();
        this.eInput.select();
    };
    Datepicker.prototype.getValue = function() {
        return this.eInput.value;
    };
    Datepicker.prototype.destroy = function() {};
    Datepicker.prototype.isPopup = function() {
        return false;
    };
    return Datepicker;
}

