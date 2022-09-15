[
    {
        "WfName": "ITServiceRequest",
        "AcessPermission": "Public", 
        "AuthGroups": ["Berger Portal Owners"],
        "AuthUsersADId": [1026],
        "AuthUsersEmpId": [1270, 334],  
        "DisplayTxt": "IT Service Request",
        "ViewUrl": { "siteUrl": "leaveauto/SitePages/ITServiceRequest.aspx?UniqueId=", "qryStrKeyTyp": "GUID", "mode": "&mode=read", "titleTag": "ITSR-" },
        "MasterListInfo": { "name": "ITServiceRequests", "select": "GUID,ID,Title,Created&$orderby=Created desc", "primaryKey": "ID"},
        "RenderDetListInfo": [{ "name": "PendingApproval", "select": "GUID,ID,Title,ProcessName,RequestedByName,Status,EmployeeID,RequestedByEmail,RequestLink,PendingWith/ID,PendingWith/Title,Author/ID,Created,Author/Title,Author/Office,Author/JobTitle&$expand=PendingWith/ID,Author/ID&$orderby=Created desc"}],
        "ApprovalListInfo": [{ "name": "ITServiceRequestAuditLog", "select": "GUID,ID,Title,RequestId,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "RequestId"}],
        "DbViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "Action", "field": "GUID", "editable":false, "minWidth": 120 },
            { "fldType": "TitleWitouthMDField", "headerName": "RequestId", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 250 }
        ],
        "MasterDetailViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "Action", "field": "GUID", "editable":false, "minWidth": 120 },
            { "fldType": "TitleWitouthMDField", "headerName": "RequestId", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 250 }
        ]
    },
    {
        "WfName": "SupplementaryBudgetRequest",
        "AcessPermission": "Public", 
        "AuthGroups": ["Berger Portal Owners"],
        "AuthUsersADId": [1026],
        "AuthUsersEmpId": [1270, 334],  
        "DisplayTxt": "Supplementary Budget CAPEX",
        "ViewUrl": { "siteUrl": "leaveauto/SitePages/SupplementaryBudgetRequest.aspx?UniqueId=", "qryStrKeyTyp": "GUID", "mode": "&mode=read", "titleTag": "SBR-" },
        "MasterListInfo": { "name": "SupplementaryBudgetRequest", "select": "GUID,ID,Title,Created&$orderby=Created desc", "primaryKey": "Title"},
        "RenderDetListInfo": [{ "name": "PendingApproval", "select": "GUID,ID,Title,ProcessName,RequestedByName,Status,EmployeeID,RequestedByEmail,RequestLink,PendingWith/ID,PendingWith/Title,Author/ID,Created,Author/Title,Author/Office,Author/JobTitle&$expand=PendingWith/ID,Author/ID&$orderby=Created desc"}],
        "ApprovalListInfo": [{ "name": "SupBudgetRequestAuditLog", "select": "GUID,ID,Title,Status,Comment,ActionBy/ID,ActionBy/Title,ActionDate&$expand=ActionBy/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "DbViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "Action", "field": "GUID", "editable":false, "minWidth": 120 },
            { "fldType": "TitleWitouthMDField", "headerName": "Request ID", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Action Date", "field": "ActionDate", "valueGetter":"ActionDate", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ],
        "MasterDetailViewColDef": [
            { "fldType": "TitleWitouthMDField", "headerName": "Request ID", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Action Date", "field": "ActionDate", "valueGetter":"ActionDate", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ]
    },
    {
        "WfName": "SupplementaryBudgetExpense",
        "AcessPermission": "Public", 
        "AuthGroups": ["Berger Portal Owners"],
        "AuthUsersADId": [1026],
        "AuthUsersEmpId": [1270, 334],  
        "DisplayTxt": "Supplementary Budget Expense",
        "ViewUrl": { "siteUrl": "leaveauto/SitePages/SupplementaryBudgetExpense.aspx?UniqueId=", "qryStrKeyTyp": "GUID", "mode": "&mode=read", "titleTag": "SBE-" },
        "MasterListInfo": { "name": "SupplementaryBudgetExpense", "select": "GUID,ID,Title,Created&$orderby=Created desc", "primaryKey": "Title"},
        "RenderDetListInfo": [{ "name": "SupBudgetExpenseAuditLog", "select": "GUID,ID,Title,Status,Comment,ActionBy/ID,ActionBy/Title,ActionDate&$expand=ActionBy/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "ApprovalListInfo": [{ "name": "SupBudgetExpenseAuditLog", "select": "GUID,ID,Title,Status,Comment,ActionBy/ID,ActionBy/Title,ActionDate&$expand=ActionBy/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "DbViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "Action", "field": "GUID", "editable":false, "minWidth": 120 },
            { "fldType": "TitleWitouthMDField", "headerName": "Request ID", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Action Date", "field": "ActionDate", "valueGetter":"ActionDate", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ],
        "MasterDetailViewColDef": [
            { "fldType": "TitleWitouthMDField", "headerName": "Request ID", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Action Date", "field": "ActionDate", "valueGetter":"ActionDate", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ]
    },
    {
        "WfName": "AssetDisposalProcess",
        "AcessPermission": "Public", 
        "AuthGroups": ["Berger Portal Owners"],
        "AuthUsersADId": [1026],
        "AuthUsersEmpId": [1270, 334],  
        "DisplayTxt": "Asset Disposal",
        "ViewUrl": { "siteUrl": "leaveauto/SitePages/AssetDisposalProcess.aspx?UniqueId=", "qryStrKeyTyp": "GUID", "mode": "&mode=read", "titleTag": "ADP-" },
        "MasterListInfo": { "name": "AssetPurchaseRequestInfo", "select": "GUID,ID,Title,Created&$orderby=Created desc", "primaryKey": "RequestId"},
        "RenderDetListInfo": [{ "name": "AssetDisposalAuditLog", "select": "GUID,ID,RequestId,Status,CommentText,ActionBy/ID,ActionBy/Title,Created&$expand=ActionBy/ID&$orderby=Created desc", "primaryKey": "RequestId"}],
        "ApprovalListInfo": [{ "name": "AssetDisposalAuditLog", "select": "GUID,ID,RequestId,Status,CommentText,ActionBy/ID,ActionBy/Title,Created&$expand=ActionBy/ID&$orderby=Created desc", "primaryKey": "RequestId"}],
        "DbViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "Action", "field": "GUID", "editable":false, "minWidth": 120 },
            { "fldType": "TitleWitouthMDField", "headerName": "Request ID", "field": "RequestId", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Action Date", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "CommentText", "editable":false, "minWidth": 120 }
        ],
        "MasterDetailViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "Action", "field": "GUID", "editable":false, "minWidth": 120 },
            { "fldType": "TitleWitouthMDField", "headerName": "Request ID", "field": "RequestId", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Action Date", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "CommentText", "editable":false, "minWidth": 120 }
        ]
    },
    {
        "WfName": "MobileHandsetRequests",
        "AcessPermission": "Public", 
        "AuthGroups": ["Berger Portal Owners"],
        "AuthUsersADId": [1026],
        "AuthUsersEmpId": [1270, 334],  
        "DisplayTxt": "Mobile Handset Request",
        "ViewUrl": { "siteUrl": "leaveauto/SitePages/MobileHandsetRequests.aspx?UniqueId=", "qryStrKeyTyp": "GUID", "mode": "&mode=read", "titleTag": "MHR-" },
        "MasterListInfo": { "name": "MobileHandsetRequests", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"},
        "RenderDetListInfo": [{ "name": "MobileHandsetRequestAuditLog", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "ApprovalListInfo": [{ "name": "MobileHandsetRequestAuditLog", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "DbViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "Action", "field": "GUID", "editable":false, "minWidth": 120 },
            { "fldType": "TitleWitouthMDField", "headerName": "Request Id", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ],
        "MasterDetailViewColDef": [
            { "fldType": "TitleWitouthMDField", "headerName": "Request Id", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ]
    },
    {
        "WfName": "VendorComplaint",
        "AcessPermission": "Public", 
        "AuthGroups": ["Berger Portal Owners"],
        "AuthUsersADId": [1026],
        "AuthUsersEmpId": [1270, 334],  
        "DisplayTxt": "Vendor Complaint",
        "ViewUrl": { "siteUrl": "leaveauto/SitePages/VendorComplaint.aspx?UniqueId=", "qryStrKeyTyp": "GUID", "mode": "&mode=read", "titleTag": "VCN-" },
        "MasterListInfo": { "name": "VendorComplain", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"},
        "RenderDetListInfo": [{ "name": "VendorComplaintAuditLog", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "ApprovalListInfo": [{ "name": "VendorComplaintAuditLog", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "DbViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "Action", "field": "GUID", "editable":false, "minWidth": 120 },
            { "fldType": "TitleWitouthMDField", "headerName": "RequestId", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ],
        "MasterDetailViewColDef": [
            { "fldType": "TitleWitouthMDField", "headerName": "RequestId", "field": "RequestId", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ]
    },
    {
        "WfName": "TravelRequest",
        "AcessPermission": "Public", 
        "AuthGroups": ["Berger Portal Owners"],
        "AuthUsersADId": [1026],
        "AuthUsersEmpId": [1270, 334],  
        "DisplayTxt": "Travel Request",
        "ViewUrl": { "siteUrl": "leaveauto/SitePages/TravelRequest.aspx?UniqueId=", "qryStrKeyTyp": "GUID", "mode": "&mode=read", "titleTag": "TR-" },
        "MasterListInfo": { "name": "TravelRequests", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"},
        "RenderDetListInfo": [{ "name": "TravelRequestAuditLog", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "ApprovalListInfo": [{ "name": "TravelRequestAuditLog", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "DbViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "Action", "field": "GUID", "editable":false, "minWidth": 120 },
            { "fldType": "TitleWitouthMDField", "headerName": "Request Id", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ],
        "MasterDetailViewColDef": [
            { "fldType": "TitleWitouthMDField", "headerName": "RequestId", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ]
    },
    {
        "WfName": "HRServices",
        "AcessPermission": "Public", 
        "AuthGroups": ["Berger Portal Owners"],
        "AuthUsersADId": [1026],
        "AuthUsersEmpId": [1270, 334],  
        "DisplayTxt": "HR Services Request",
        "ViewUrl": { "siteUrl": "leaveauto/SitePages/HRServices.aspx?UniqueId=", "qryStrKeyTyp": "GUID", "mode": "&mode=read", "titleTag": "HRSR-" },
        "MasterListInfo": { "name": "HRServices", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"},
        "RenderDetListInfo": [{ "name": "HRServicesAuditLog", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "ApprovalListInfo": [{ "name": "HRServicesAuditLog", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "DbViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "Action", "field": "GUID", "editable":false, "minWidth": 120 },
            { "fldType": "TitleWitouthMDField", "headerName": "Title", "field": "Title", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ],
        "MasterDetailViewColDef": [
            { "fldType": "TitleWitouthMDField", "headerName": "RequestId", "field": "RequestId", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ]
    },
    {
        "WfName": "WorkshopProposal",
        "AcessPermission": "Public", 
        "AuthGroups": ["Berger Portal Owners"],
        "AuthUsersADId": [1026],
        "AuthUsersEmpId": [1270, 334],  
        "DisplayTxt": "Workshop Proposal",
        "ViewUrl": { "siteUrl": "leaveauto/SitePages/WorkshopProposal.aspx?UniqueId=", "qryStrKeyTyp": "GUID", "mode": "&mode=read", "titleTag": "WP-" },
        "MasterListInfo": { "name": "WorkshopProposalMaster", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"},
        "RenderDetListInfo": [{ "name": "WorkshopProposalAuditLog", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "ApprovalListInfo": [{ "name": "WorkshopProposalAuditLog", "select": "GUID,ID,Title,Status,Comment,Author/ID,Author/Title,Created&$expand=Author/ID&$orderby=Created desc", "primaryKey": "Title"}],
        "DbViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "Action", "field": "GUID", "editable":false, "minWidth": 120 },
            { "fldType": "TitleWitouthMDField", "headerName": "Title", "field": "RequestId", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ],
        "MasterDetailViewColDef": [
            { "fldType": "ViewLinkGuidField", "headerName": "Action", "field": "GUID", "editable":false, "minWidth": 120 },
            { "fldType": "TitleWitouthMDField", "headerName": "Title", "field": "RequestId", "editable":false, "minWidth": 120 },
            { "fldType": "GetSetDateTimeField", "headerName": "Created", "field": "Created", "valueGetter":"Created", "editable":false, "minWidth": 190 },
            { "fldType": "TextField", "headerName": "Status", "field": "Status", "editable":false, "minWidth": 165 },
            { "fldType": "TextField", "headerName": "Comment", "field": "Comment", "editable":false, "minWidth": 120 }
        ]
    }
]
