// @ts-nocheck

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Schema } from "@dashjoin/json-schema-form";
import { SharepointlistService } from '@portal/core';
//import {MatAccordion} from '@angular/material/expansion';
import { UserService, ICustomer } from '@portal/shared/data-access-user'
import { from } from 'rxjs';

export class IFunctionalContact{
  Name: any;
  Role: any;
  Phone: any;
  Email: any;
}

@Component({
  selector: 'portal-supportparent',
  templateUrl: './supportparent.component.html',
  styleUrls: [
    './supportparent.component.scss',   
  ]
})
export class SupportparentComponent implements OnInit {
  //========================
  currentAbsoluteUrl = window.location.href;
  readMode = "";
  uId = "";
  
  listInfo = {
    name: "",
    select: "",
    expand: "",
    filterBy: "",
    filterWith: "",
    top: ""
  };

  parsedRequestInfo = {
    uId: "",
    readMode: "",
    ID: null,
    Title: null,
    Status: null,
    RnDLabTest: null,
    PendingWith: null,
    RequestorAdId: null,
    CapexBudgetProposal: null
  };

  //requestorsInfo!: ICustomer;

  PendingWith = "Mostafa Kamal";
  approvalHistory: any = [];
  allApprovers: any = {};
  @Output() outputToParent = new EventEmitter<any>();
  @Output() btnClickAction: EventEmitter<any> = new EventEmitter<any>();

  disabled = false; //disabled input text field for Suppord Info Grp
  SupportInfoFG:FormGroup;

  showReqInfoDiv: boolean = false;
  supModel:any;

  FunctionalContacts: IFunctionalContact[] = [];

  //-----for attachment -----

  @ViewChild('attachments') attachment: any;

  fileList: File[] = [];
  listOfFiles: any[] = [];
  isLoading = false;
  //-----------------------
  _form!: FormGroup;

  requestorsInfo:any;

  // requestorsInfo = {
  //   CustName: 'Mostafa Kamal',
  //   CustCompanyName: 'BPBL',
  //   CustId: '1270',
  //   CustCompanyAddress: 'Corporate',
  //   CustDesignation: 'Kamal',
  //   CustEmail: 'kamal@bergerbd.com',
  //   CostCenter: '77777777',
  //   CustContact: '345464',
  //   RequestDate: '2022'
  // };

  panelOpenState = false;

  openedStartDrawer = false;
  openedEndDrawer = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  requestInfo: any = {};

 // @ViewChild(MatAccordion) accordion: MatAccordion;

  _matcardInfo = { 
    dragPosition: {x: 10, y: 10},
    divStyle: {
      resize: 'both',
      overflow: 'hidden',
      width: '340px',
      height: '300px',
      background: 'whitesmoke'
    },    
    matCardTitle: 'Info to identify a solution:',
    styleTitle:{
      textAlign: 'center', 
      color: 'navy',
      fontFamily:'Arial',
      fontWeight: 100,
      fontSize: '16px'
    },
    matCardSubtitle: 'Please provide some more details about your issue.',
    styleSubTitle:{
      textAlign: 'left', 
      color: 'black',
      fontFamily:'Arial',
      fontWeight: 80,
      fontSize: '12px'
    },
    matCardContent: '',
    styleContent:{
      textAlign: 'left', 
      color: 'gray',
      fontFamily:'Arial',
      fontWeight: 50,
      fontSize: '10px'
    },
    matCardImage: '',
    matCardActions: '',
    matCardFooter: '',
  };

  requestorSchema: Schema = {
    "type": "object",
    "properties": {
    "System Opener": { type: "string", description: "Please enter your name", style: {width: '400px', height: "10px"} },
    "Contact Details": { type: "string", description: "Please enter your name", style: {width: '400px', "height": "100px"}, widget: "textarea", widgetType: "rich-text-editor" },
    "Systen Information":{
      type: "string",
      widget: "select",
      displayWithChoices: [
        "SAP",
        "Microsoft",
        "AWS"
      ],
      choices: [
        "SAP",
        "Microsoft",
        "AWS"
      ],
      style: {width: '400px', height: "10px"},
    },
    "Product Area":{
      type: "string",
      widget: "select",
      displayWithChoices: [
        "SAP-FICO",
        "SAP-SD",
        "SAP-MM",
        "SAP-PP"
      ],
      choices: [
        "SAP-FICO",
        "SAP-SD",
        "SAP-MM",
        "SAP-PP"
      ],
      style: {width: '400px'},
    }
    }
    
  };

  descriptionSchema: Schema = {
    "type": "object",
    "properties": {
      "DesConsent": { type: "boolean", description: "I Consent to SAP Support......", style: {width: '400px'} },
      "Subject": { type: "string", description: "Give the issue a title", style: {width: '400px'} },
      "Description": { type: "string", description: "Please enter issue details", style: {width: '400px', "height": "100px"}, widget: "textarea", widgetType: "rich-text-editor" },
        
    }    
  };

  prioritySchema: Schema = {
    "type": "object",
    "properties": {
      "Priority":{
        type: "string",
        widget: "select",
        displayWithChoices: [
          "Low-Business operations not affected",
          "Medium-Business operations are affected",
          "High-Business operations are highly affected",
          "Very High-Business operations are extremely affected"
        ],
        choices: [
          "Low-Business operations not affected",
          "Medium-Business operations are affected",
          "High-Business operations are highly affected",
          "Very High-Business operations are extremely affected"
        ],
        style: {width: '400px'},
      }
        
    }
    
  };

  contactDetSchema: Schema = {
    "type": "object",
    "properties": {
      "Name": { type: "string", description: "Please enter your Name", style: {width: '400px', height: "10px"} },
      "Role": { type: "string", description: "Please enter your Role", style: {width: '400px', height: "10px"} },
      "Primary Phone": { type: "string", description: "Please enter your Primary Phone", style: {width: '400px', height: "10px"} },
      "Secondary Phone": { type: "string", description: "Please enter your Secondary Phone", style: {width: '400px', height: "10px"} },
      "Email": { type: "string", description: "Please enter your Email", style: {width: '400px', height: "10px"} },      
      "Time Zone":{
        type: "string",
        widget: "select",
        displayWithChoices: [
          "BDT",
          "BST"
        ],
        choices: [
          "BDT",
          "BST"
        ],
        style: {width: '400px', height: "10px"},
      }
        
    }
    
  };

  constructor(
    private formBuilder: FormBuilder,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    public userService: UserService,
    public sharepointlistService: SharepointlistService) {
    this.openedStartDrawer = false;
    this.openedEndDrawer = true;

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    if (this.currentAbsoluteUrl.indexOf('=') > -1) {
      let varCurrentUrlSplitArray = this.currentAbsoluteUrl.split('?');
      if (varCurrentUrlSplitArray.length >= 2) {
        let queryString = varCurrentUrlSplitArray[1];
        let parameters = queryString.split('&');
        for (let i = 0; i < parameters.length; i++) {
          let param = parameters[i];
          if (param.toLowerCase().indexOf('uniqueid=') > -1)
            this.uId = param.split('=')[1];
          else if (param.toLowerCase().indexOf('mode=') > -1)
            this.readMode = param.split('=')[1];
        }
      }
    };

    
  }

  ngOnInit(): void {       

    //===========implementing Reactive form start====
    if (this.uId != "") {
      this.executeOnInitProcessesOnUid();     
    } 
    else {
      this.executeOnInitProcesses();
    }

    //----- implementing Reactive form ends ----

   
  }

  private _createForm() {
    this._form = this.formBuilder.group({
      AppParameters: this.formBuilder.group({
        SupportInfo: this.formBuilder.group({
          SupportCategory: ['', Validators.required],
          SystemDetail: ['', ""],
          ProductArea: ['', ""],
          ConcernedPerson: ['', Validators.required],
          ContactNo: ['', Validators.required],
          ContactEmail: ['', Validators.required],
        }),
        ProblemDescription: this.formBuilder.group({
          Subject: ['', Validators.required],
          Description: ['', Validators.required],          
          Consent: ['', Validators.required]
        }),
        Priority: this.formBuilder.group({          
          Priority: ['', Validators.required],
          EmergContact: ['', ""],
          BusinessImpact: ['', ""],
        }),
        Attachments: this.formBuilder.array([{
          Attachment: ['', ""]
        }]),
        FunctionalContacts: this.formBuilder.array([{
          Name: ['', Validators.required],
          Role: ['', Validators.required],
          Phone: ['', Validators.required],
          Email: ['', Validators.required]
        }]) 
        
      })        
    }); 

    // this._form = this.formBuilder.group({
    //   AppParameters: this.formBuilder.group({})        
    // }); 

    // this._form.get('AppParameters').addControl('SupportInfo', this.formBuilder.group({
    //   SupportCategory: ['', Validators.required],
    //   ConcernedPerson: ['', Validators.required],
    //   ContactNo: ['', Validators.required],
    //   ContactEmail: ['', Validators.required],
    // }));
    
    //  this._form.controls.AppParameters.controls.SupportInfo.addControl('SystemDetail', this.formBuilder.control('', Validators.required));
    //  this._form.controls.AppParameters.controls.SupportInfo.addControl('ProductArea', this.formBuilder.control('', Validators.required));

    

    // this._form.get('AppParameters').addControl('ProblemDescription', this.formBuilder.group({
    //   Subject: ['', Validators.required],
    //   Description: ['', Validators.required],
    //   Attachment: ['', Validators.required],
    //   Priority: ['', Validators.required],
    //   Consent: ['', Validators.required],
    // }));

    // this._form.controls.AppParameters.controls.ProblemDescription.addControl('EmergContact', this.formBuilder.control('', Validators.required));
    // this._form.get('AppParameters').controls.ProblemDescription.addControl('BusinessImpact', this.formBuilder.control('', Validators.required));

    // this._form.get('AppParameters').addControl('FunctionalContact', this.formBuilder.array([
    //   {
    //     Subject: ['', Validators.required],
    //     Description: ['', Validators.required],
    //     Attachment: ['', Validators.required],
    //     Priority: ['', Validators.required],
    //     Consent: ['', Validators.required],
    //   }
    // ]));  

    
  }

  GetOutputVal(valFrmChild: any) {
    console.log("");
  }

    //===========implementing Reactive form start====

      //======implementing async - await =====
  async executeOnInitProcesses(){    

    // this.requestInfo = {
    //   uId: "",
    //   readMode: "",
    //   Status: "",
    //   MatcardInfo: this._matcardInfo 
    // };

    this.supModel = 
    {
      AppParameters: 
      {
        SupportInfo: 
        {
          SupportCategory: "Dummy Text SupportCategory",
          SystemDetail: "Dummy Text SupportCategory",
          ProductArea: "Dummy Text SupportCategory",
          ConcernedPerson: "Dummy Text SupportCategory",
          ContactNo: "Dummy Text SupportCategory",
          ContactEmail: "Dummy Text SupportCategory",
        },
        ProblemDescription: 
        {
          Subject: "Dummy Text SupportCategory",
          Description: "Dummy Text SupportCategory",
          Consent: "Dummy Text SupportCategory",
        },
        Priority: 
        {         
          Priority: "Dummy Text SupportCategory",
          EmergContact: "Dummy Text SupportCategory",
          BusinessImpact: "Dummy Text SupportCategory",
        },
        Attachments: [{
          Attachment: "Dummy Text SupportCategory"
        }],
        FunctionalContact: [{
          Name: "Dummy Text SupportCategory",
          Role: "Dummy Text SupportCategory",
          Phone: "Dummy Text SupportCategory",
          Email: "Dummy Text SupportCategory"
        }]
        
      }        
    }; 

    try{
      await this._createForm();
      
      // setTimeout(() => {
      //   this._addGroup();
      // }, 100);    

      // this.requestorsInfo = {
      //   CustName: 'Mostafa Kamal',
      //   CustCompanyName: 'BPBL',
      //   CustId: '1270',
      //   CustCompanyAddress: 'Corporate',
      //   CustDesignation: 'Kamal',
      //   CustEmail: 'kamal@bergerbd.com',
      //   CostCenter: '77777777',
      //   CustContact: '345464',
      //   RequestDate: '2022'
      // };



      //const loggedUser = await this.userService.loggedUserInfo$; 
      const loggedUser = await this.userService.customerInfo; //from Database Table
      //const loggedUser = await this.userService.customersList[0]; //from local storage data of service
      

      //this.logedUserAdId = loggedUser.cId;
      //let applicantInfo = await this.getEmpInfo(empAdId);



      this.requestorsInfo = loggedUser;
      this.showReqInfoDiv = true;

      //this._form.get('Requestor').patchValue(loggedUser);

      
      
    } 
    catch(err){
      console.log("Error: " + err)
    }
  }

    async executeOnInitProcessesOnUid(){    
      try{
        await this._createForm();
  
        const loggedUser = await this.userService.loggedUserInfo$; //this.getEmpAdId();
        //this.logedUserAdId = loggedUser.cId;

        let masterListInfo:any = await this.getMasterListInfo(loggedUser);
        
        this.requestorsInfo = await masterListInfo['CapexBudgetProposal'].Requestor;      
        
        this._form.get('Requestor').patchValue(this.requestorsInfo);  
        
        let grdInfo = [
          {
            GridColDef: dashboardsListsInfo[0].GridColDef,
            GridColVal: masterListInfo['CapexBudgetProposal'].Datagridcrudhomeitems
            //GridColVal: dashboardsListsInfo[0].GridColVal
          }
        ];
  
  
  
        // /* creating grid coltrols array start */
  
        let gridValidationParam =          
          { 
            ClassCode: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            ClassDescription: [Validators.maxLength(6)], 
            BusinessArea: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            AreaDescription: [Validators.maxLength(6)], 
            CostCenter: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            CCDescription: [Validators.maxLength(6)], 
            ProposedItemDescription: [Validators.maxLength(40)],
            ImportOrLocal: [Validators.required, Validators.maxLength(6)], 
            Qty: [Validators.required, Validators.maxLength(3)], 
            UM: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            UnitPrice: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            TotalBDT: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            Justfication: [Validators.required, Validators.minLength(4), Validators.maxLength(6)],
            UserName: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            UserEmpID: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            '5YearPlan': [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            CurAvaCapacity: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            ReqProdCapacity: [Validators.required, Validators.minLength(4), Validators.maxLength(6)],
            SalesForecast: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            ExpectedCapacity: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            ExpComMonth: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            NewOrReplace: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            ExistingAssetID: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            CAPEXStrategy: [Validators.required, Validators.minLength(4), Validators.maxLength(6)], 
            Comments: [Validators.required, Validators.minLength(4), Validators.maxLength(6)]
        };
  
        // let items = masterListInfo['CapexBudgetProposal'].Datagridcrudhomeitems;
        // let budgetItemsincludesIT = false;
        // let groupLoopingCount = 0;
  
        // for(let i = 0; i< items.length; i++){
        //   if(items[i].ClassCode == 3200 || items[i].ClassCode == 6300){
        //     this.budgetItemsIT.push(items[i]);
        //     budgetItemsincludesIT = true;          
        //   }else{
        //     this.budgetItemsNonIT.push(items[i]);          
        //   }
        //   groupLoopingCount ++; //to track all items is being checked
  
        //   if(budgetItemsincludesIT && groupLoopingCount == items.length){
        //     this.populateGridControls(this.budgetItemsIT);
        //   }else if(groupLoopingCount == items.length){
        //     this.populateGridControls(this.budgetItemsNonIT);
        //   }
        // }
        
  
        this.PendingWith = masterListInfo['PendingWith'].results[0].Title;
  
        this.approvalHistory = masterListInfo['CapexBudgetProposal'].ApprovalHistory;
        
        
        
      } 
      catch(err){
        console.log("Error: " + err)
      }
    }

    getMasterListInfo(empADId:any){
      this.listInfo.name = "CapexBudgetMaster";
      this.listInfo.select = 'Status' + "," + 'RequestorEmpId' + "," + 'CapexBudgetProposal' + "," + 'GUID' + "," + 'Modified' + "," + 'Created' + "," + 'PendingWith/ID' + "," + 'PendingWith/Title' + "," + 'Author/ID' + "," + 'Author/Title' + "," + 'ID' + "," + 'Title';
      this.listInfo.expand = 'Author' + "," + 'PendingWith';
      this.listInfo.filterBy = 'GUID';
      this.listInfo.filterWith = this.uId;
      this.listInfo.top = '100000';    
  
      return new Promise((resolve, reject)=>{
        try{
          from(
            this.sharepointlistService.getItemWithAnyFilterExpand(this.listInfo, empADId)
              ).subscribe(
                (res) =>{                     
                  this.parsedRequestInfo = { 
                    uId: this.uId,
                    readMode: this.readMode,
                    ID: res[0].ID,
                    Title: res[0].Title,
                    Status: res[0].Status,
                    RnDLabTest: JSON.parse(res[0].CapexBudgetProposal),
                    PendingWith: res[0].PendingWith,
                    RequestorAdId: res[0].Author.ID,
                    CapexBudgetProposal: JSON.parse(res[0].CapexBudgetProposal), 
                  }
                  resolve(this.parsedRequestInfo);
                  return this.parsedRequestInfo;                
                },    
                (err) => {
                    reject('Retrieve data failed !');
                    console.log(err)
                },
              ); 
        } 
        catch(err){
          reject('Retrieve data failed !');
          console.log("Error: " + err);
        }
      })
    }

    onSubmitBtn(){
      (document.getElementById('btnSubmitNewReq') as HTMLInputElement).disabled = true;
      setTimeout(function () {
        (document.getElementById('btnSubmitNewReq') as HTMLInputElement).style.display = 'none';
      }, 1000);      
    }

    approverAction(action:any){
      this.outputToParent.emit(this._form.value);
      this.btnClickAction.emit(action);
    }

    //----- implementing Reactive form ends ----


    //============ implementing attachment ==========
    onFileChanged(event: any) {
      this.isLoading = true;
      for (var i = 0; i <= event.target.files.length - 1; i++) {
        var selectedFile = event.target.files[i];
        if (this.listOfFiles.indexOf(selectedFile.name) === -1) {
          this.fileList.push(selectedFile);
          //this.listOfFiles.push(selectedFile.name);
          this.listOfFiles.push(selectedFile);
        }
      }
  
      this.isLoading = false;
  
      //this.attachment.nativeElement.value = '';
    }
  
    removeSelectedFile(index) {
      // Delete the item from fileNames list
      this.listOfFiles.splice(index, 1);
      // delete file from FileList
      this.fileList.splice(index, 1);
    }
    //---------------attachment ends --------------


}

//===================================

