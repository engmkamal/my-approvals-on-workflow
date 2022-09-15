[
    {
        "WfName": "SampleTest",
        "AcessPermission": "Private", 
        "AuthGroups": ["Berger Portal Owners"],
        "AuthUsersADId": [127, 255, 231, 1026, 21],
        "AuthUsersEmpId": [1270],  
        "DisplayTxt": "Sample Test Dashboard",
        "ViewUrl": { "siteUrl": "leaveauto/SitePages/SampleTest.aspx?UniqueId=", "qryStrKeyTyp": "GUID", "mode": "&mode=read", "titleTag": "ST-" },
        "MasterListInfo": { "name": "RnDLabTestMaster", "select": "GUID,ID,Title,Status,RequestorEmpId,RnDLabTest,Modified,Created,PendingWith/ID,PendingWith/Title,Author/ID,Author/Title,Author/Office,Author/JobTitle&$expand=PendingWith/ID,Author/ID&$orderby=Created desc", "primaryKey": "Title"},
        "RenderDetListInfo": [{ "name": "RnDLabTestMaster", "select": "GUID,ID,Title,Status,RequestorEmpId,RnDLabTest,Modified,Created,PendingWith/ID,PendingWith/Title,Author/ID,Author/Title,Author/Office,Author/JobTitle&$expand=PendingWith/ID,Author/ID&$orderby=Created desc"}],
        "DetailsListInfo": [{ "name": "RnDLabTestMaster", "select": "GUID,ID,Title,Status,RequestorEmpId,RnDLabTest,Modified,Created,PendingWith/ID,PendingWith/Title,Author/ID,Author/Title,Author/Office,Author/JobTitle&$expand=PendingWith/ID,Author/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "DbViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "View", "field": "GUID", "editable":false, "minWidth": 80 },
            { "fldType": "TitleWitouthMDField", "headerName": "RequestID", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 120 },
            { "fldType": "TextField", "headerName": "Requested by", "field": "Author.Title", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Office", "field": "Author.Office", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "JobTitle", "field": "Author.JobTitle", "editable":false, "minWidth": 165 }
        ],
        "MasterDetailViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "View", "field": "GUID", "editable":false, "minWidth": 80 },            
            { "fldType": "TitleWitouthMDField", "headerName": "RequestID", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "NumberField", "headerName": "TotalSamples", "field": "TotalSamples", "editable":false, "minWidth": 140 },
            { "fldType": "TextField", "headerName": "SampleID", "field": "Samples.SampleID", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "SampleDescription", "field": "Samples.SampleDescription", "editable":false, "minWidth": 200 },
            { "fldType": "TextField", "headerName": "ReferenceNo", "field": "Samples.ReferenceNo", "editable":false, "minWidth": 150 },
            { "fldType": "TextField", "headerName": "SampleQuantity", "field": "Samples.SampleQuantity", "editable":false, "minWidth": 160 },
            { "fldType": "TextField", "headerName": "SampleType", "field": "Samples.SampleType", "editable":false, "minWidth": 150 },
            { "fldType": "TextField", "headerName": "MaterialConstruction", "field": "Samples.MaterialConstruction", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Test Parameter Name", "field": "TPName", "editable":false, "minWidth": 200 },
            { "fldType": "TextField", "headerName": "Test Parameter Method", "field": "TPMethod", "editable":false, "minWidth": 200 },            
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Requested by", "field": "Author.Title", "editable":false, "minWidth": 180 },
            { "fldType": "TextField", "headerName": "JobTitle", "field": "Author.JobTitle", "editable":false, "minWidth": 200 },
            { "fldType": "TextField", "headerName": "Office", "field": "Author.Office", "editable":false, "minWidth": 165 },
            { "fldType": "GetSetDateField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 120 }
        ]
    }
]
