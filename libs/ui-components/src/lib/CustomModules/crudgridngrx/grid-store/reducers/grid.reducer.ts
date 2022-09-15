import { GridActionTypes } from './../actions/grid.actions';
import { v4 as uuid } from 'uuid';

import produce from 'immer';

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
