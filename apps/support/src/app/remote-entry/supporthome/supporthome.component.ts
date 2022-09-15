// @ts-nocheck

import { Component, OnInit, HostListener } from '@angular/core';
import { from } from "rxjs";
import { SharepointlistService } from '@portal/core';
//import { Router } from '@angular/router';



@Component({
  selector: 'portal-supporthome',
  templateUrl: './supporthome.component.html',
  styleUrls: ['./supporthome.component.scss'],  
  // styleUrls: [
  //   './capexbudgethome.component.scss',
  //   '../../../../../../assets/css/indigo-pink.css',
  //   '../../../../../../assets/css/ng-select.component.scss',
  //   '../../../../../../assets/css/material.theme.scss',
  // ]
})
export class SupporthomeComponent implements OnInit {

  currentAbsoluteUrl = window.location.href;
  Status = "";
  uId = "";
  readMode = "";
  logedUserAdId = null;
  _testParamNode = null;
  requestInfo: any = {};
  parsedTestParameters:any;
  testParameters = {};//should be omited
  reportReleaseGrp = {}; //should be omited
  childBtnClickAction = "";
  createReqInfoFrmChild:any;
  approvalLink:any;
  reviewLink:any;
  pendingApprovalListInfo:any;
  updatedMstrLstInfo:any;
  labResponsibles = [];
  labResponsiblesOpms = [];
  emitedDataFrmChild:any;
  auditLogComments = "";

  public listInfo = {
    name: "",
    select: "",
    expand: "",
    filterBy: "",
    filterWith: "",
    top: 0
  };

  parsedRequestInfo = {
    uId: '',
    readMode: '',
    ID: null,
    Title: null,
    Status: null,
    RnDLabTest: null,
    PendingWith: null,
    RequestorAdId: null,
    CapexBudgetProposal: null
  };
  
  //webAbsoluteUrl = window.location.origin + "/leaveauto";
  webAbsoluteUrl = "https://portaldv.bergerbd.com/leaveauto";

  //==for alert==
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  //=========for customer feedback ===========
  rating:number = 3;
  starCount:number = 5;
  starColor = 'accent';

  allApprovers: any = {};

  dataFrmExcelUpload: any = [];

  // starColorP:StarRatingColor = StarRatingColor.primary;
  // starColorW:StarRatingColor = StarRatingColor.warn;

  // public feedback = {
  //   infoAvailabilityR : 3,
  //   serviceResponseR : 3,
  //   repClarificationR : 3,
  //   servReliabilityR : 3,
  //   presentationModeR : 3
  // }

  constructor(public sharepointlistService: SharepointlistService) {
    //=====Reading unique id from url -- start ==========
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
    }
    //------Reading unique id from url -- End-----
  }

  ngOnInit(): void {

    if (this.uId != "") {
      this.listInfo.name = "CapexBudgetMaster";
      this.listInfo.select = 'Status' + "," + 'RequestorEmpId' + "," + 'CapexBudgetProposal' + "," + 'GUID' + "," + 'Modified' + "," + 'Created' + "," + 'PendingWith/ID' + "," + 'PendingWith/Title' + "," + 'Author/ID' + "," + 'Author/Title' + "," + 'ID' + "," + 'Title';
      this.listInfo.expand = 'Author' + "," + 'PendingWith';
      this.listInfo.filterBy = 'GUID';
      this.listInfo.filterWith = this.uId;
      this.listInfo.top = 100000;

      this.sharepointlistService.getSPLoggedInUser().then((res) => {
        this.logedUserAdId = res;
        from(
          this.sharepointlistService.getItemWithAnyFilterExpand(this.listInfo, res)
        ).subscribe(
          (res) => {
            let userRnDSections:any = [];

            // let r : any = testData.RnDLabTest;

            // this.parsedRequestInfo = {
            //   uId: testData.uId,
            //   readMode: testData.readMode,
            //   ID: testData.ID,
            //   Title: testData.Title,
            //   Status: testData.Status,
            //   RnDLabTest: JSON.parse(r),
            //   PendingWith: testData.PendingWith
            // };

            this.parsedRequestInfo = { 
              uId: this.uId,
              readMode: this.readMode,
              ID: res[0].ID,
              Title: res[0].Title,
              Status: res[0].Status,
              CapexBudgetProposal: JSON.parse(res[0].CapexBudgetProposal),
              PendingWith: res[0].PendingWith,
              RequestorAdId: res[0].Author.ID,
              RnDLabTest: JSON.parse(res[0].CapexBudgetProposal)
            }
            
            if (this.readMode == "read" || this.readMode == "print" || this.readMode == "feedback") {
              this.requestInfo = this.parsedRequestInfo;
            } 
            else if (res[0].Status == 'Submitted') {
              this.requestInfo = this.parsedRequestInfo;
            }
            else {
              //=== checking whether loged user is PendingWith person or not

              //if ((this.parsedRequestInfo.PendingWith.results).some(user => user.ID == this.logedUserAdId)) {

                if (res[0].Status == 'SubmittedToITInfra' || res[0].Status == 'SubmittedToCCAI' || res[0].Status == 'Submitted' || res[0].Status == 'PickedUp' || this.Status == 'PickedUp') {
                  // for (let t = 0; t < this.testParameters.length; t++) {
                  //   for (let r = 0; r < this.testParameters[t].Respectives.length; r++) {
                  //     if (this.testParameters[t].Respectives[r].RAdId == this.logedUserAdId) {
                  //       this._testParamNode = t;
                  //       userRnDSections.push(
                  //         { RnDSection: this.testParameters[t].RnDSection }
                  //       )
                  //     }
                  //   }
                  // }

                  this.parsedTestParameters = JSON.parse(res[0].RnDLabTest);

                  let labPersonnelData = this.parsedTestParameters.TestParameters.filter(x => userRnDSections.map(y => y.RnDSection).includes(x.Title.RnDSection));

                  let logedLabPersonnelData = labPersonnelData.filter(x => (x.Title.Respectives.some(y=>y.RAdId == this.logedUserAdId)));

                  this.requestInfo = {
                    uId: this.uId,
                    readMode: this.readMode,
                    Status: res[0].Status,
                    RnDLabTest: logedLabPersonnelData
                  };
                  this.Status = res[0].Status;
                  //this.Status = 'PartiallyReported';
                }

                else if (this.parsedRequestInfo.Status == 'PartiallyReported') {
                  //== filtering only the TestParameterStatus=="Submitted"
                  for (let t = 0; t < this.parsedRequestInfo.RnDLabTest.TestParameters.length; t++) {
                    if (this.parsedRequestInfo.RnDLabTest.TestParameters[t].TestParameterStatus == "Submitted") {
                      this._testParamNode = t; // get array index of this TestParameter
                      //=== maping the loged user's RnDLabTest 
                      // for (let t = 0; t < this.testParameters.length; t++) {
                      //   for (let r = 0; r < this.testParameters[t].Respectives.length; r++) {
                      //     if (this.testParameters[t].Respectives[r].RAdId == this.logedUserAdId) {

                      //       userRnDSections.push(
                      //         { RnDSection: this.testParameters[t].RnDSection }
                      //       )
                      //     }
                      //   }
                      // }
                    }

                    this.parsedTestParameters = JSON.parse(res[0].RnDLabTest);
                    let labPersonnelData = this.parsedTestParameters.TestParameters.filter(x => userRnDSections.map(y => y.RnDSection).includes(x.Title.RnDSection))

                    this.requestInfo = {
                      uId: this.uId,
                      readMode: this.readMode,
                      Status: res[0].Status,
                      RnDLabTest: labPersonnelData
                    };
                    this.Status = res[0].Status;
                  }
                }
                else if (this.parsedRequestInfo.Status == 'Reported' || this.Status == 'Completed') {

                  this.requestInfo = this.parsedRequestInfo;


                  this.Status = this.parsedRequestInfo.Status;
                  //console.log('PartiallySubmitted');
                }
              // } else {
              //   alert("Unaothorized access: this application is neither applied by you nor pending with you!!");
              //   setTimeout(function () {                  
              //     window.location.href = "https://portal.bergerbd.com/leaveauto/SitePages/MyWFRequest.aspx";
              //     //window.location.href = this.webAbsoluteUrl + "/SitePages/MyWFRequest.aspx";
              //   }, 4000);
              // }

            }

          },
          (err) => {
            console.log(err)
          },
        );
      });
    } else {
      this.sharepointlistService.getSPLoggedInUser().then((res) => {
        this.logedUserAdId = res;
        this.requestInfo = {
          uId: "",
          readMode: "",
          Status: "",
          logedUserAdId: this.logedUserAdId,
          //GridInfo: 
        };
      });
    }
  }

  executeAfterViewInit(){
    this.allApprovers = 
      {
        headITInfraName: "Shoab Mahmood Al Naoshad",
        headITInfraEmail: "shoaib@bergerbd.com",
        headITInfraAdId: 21,
        headITInfraEmpId: "",
        headIAssetName: "Mahbubur Rahman",
        headAssetEmail: "mrahman@bergerbd.com",
        headAssetAdId: 129,
        headAssetEmpId: ""
      }
  }

  ngAfterViewInit() { 
    this.executeAfterViewInit();
  }


  // //================= working with screen size starts ==============
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   if (event.target.innerWidth < 768) {
  //     //implement logic
  //   } else {
  //     //implement logic
  //   }
  // }

  // isBiggerScreen() {
  //   const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  //   if (width < 768) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // //------------ working with screen size ends --------------------------

  GetOutputVal(valFrmChild: any) {
    if (this.uId == "") {
      this.createReqInfoFrmChild = valFrmChild;
    }
    else {
      this.emitedDataFrmChild = valFrmChild;
    }

  }

  GetGridData(valFrmChild: any) {
    if (this.uId == "") {
      this.createReqInfoFrmChild = valFrmChild;
    }
    else {
      this.emitedDataFrmChild = valFrmChild;
    }

  }

  createNotification(templet?:any, to?:any, requestor?:any, pending?:any, title?:any, status?:any) {
    if (this.uId != "") {
      this.reviewLink = 'https://portal.bergerbd.com/leaveauto/SitePages/CapexBudget.aspx?UniqueId=' + this.uId + "&mode=read";
      this.approvalLink = 'https://portal.bergerbd.com/leaveauto/SitePages/CapexBudget.aspx?UniqueId=' + this.uId;
      //this.reviewLink = this.webAbsoluteUrl + '/SitePages/SampleTest.aspx?UniqueId=' + this.uId + "&mode=read";
      //this.approvalLink = this.webAbsoluteUrl + '/SitePages/SampleTest.aspx?UniqueId=' + this.uId;
    }

    let emailFldData;

    switch (templet) {
      case "Notification": {
        emailFldData = {
          Status: "Submitted",
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: "",
          ApprovalLink: "",
          Title: "Request for 'Capex Budget' workflow with ref# " + title + " has been initiated",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Mr./Ms. ${requestor},</b><br/>
                Request for &quot;Capex Budget&quot; workflow has been initiated. Any review or update will be available in the requestor&#39;s My Process of Berger Portal.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: ${status},<br/>
                Pending with: Lab respectives,
              </p>              
            </div>
          `,
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>Research & Development Center,<br/>Berger Paints Bangladesh Limited,<br/>Email: info@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
        }
        break;
      }
      case "Approval": {
        emailFldData = {
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: this.reviewLink,
          ApprovalLink: this.approvalLink,
          Status: "Submitted",
          Title: "Request for 'Capex Budget' workflow with ref# " + title + " is waiting for your approval",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>IT Department,<br/>Berger Paints Bangladesh Limited,<br/>Email: info@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Request for &quot;Capex Budget&quot; workflow is waiting for your approval. Please process to continue either from Pending Approval of Berger Portal or from the process link below.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: ${status},<br/>
              </p>              
            </div>
          `,
        }
        break;
      }
      case "PickedUp": {
        emailFldData = {
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: "",
          ApprovalLink: "",
          Status: "Submitted",
          Title: "Acknowledgement of Sample received for 'Capex Budget' workflow with ref# " + title + ".",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>IT Department,<br/>Berger Paints Bangladesh Limited,<br/>Email: info@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Sample has been received for &quot;Capex Budget&quot; workflow and is being picked up by respective lab personnel for testing.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: "Sample Received",<br/>
              </p>              
            </div>
          `,
        }
        break;
      }
      case "Completed": {
        emailFldData = {
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Title: "Request for 'Capex Budget' workflow with ref# " + title + " has been processed",
          ToId: {
            results: [to]
          },
          CCId: {
            results: []
          },          
          ReviewLink: this.reviewLink,
          ApprovalLink: this.approvalLink,
          Status: "Completed",
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>IT Department,<br/>Berger Paints Bangladesh Limited,<br/>Email: info@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Request for &quot;Capex Budget&quot; workflow has been processed. It can be viewed either from My Process of Berger Portal or from the review link below.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: "Report Released",
              </p>
              <p>For Customer Feedback: <a href="https://portal.bergerbd.com/leaveauto/SitePages/CapexBudget.aspx/?UniqueId=${this.uId}&mode=feedback"><b>click here</b></a></p>                            
            </div>
          `,
        }
        break;
      }    
      case "FeedbackSubmitted": {
        emailFldData = {
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Title: "Request for 'Capex Budget' workflow with ref# " + title + " has been processed",
          ToId: {
            results: [to]
          },
          CCId: {
            results: []
          },          
          ReviewLink: this.reviewLink,
          ApprovalLink: this.approvalLink,
          Status: "FeedbackSubmitted",
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>IT Department,<br/>Berger Paints Bangladesh Limited,<br/>Email: info@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Customer feedback of &quot;Capex Budget&quot; WF has been submitted. It can be viewed from admin dashboard Feedback link.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: "Feedback Submitted",<br/>
              </p>
              <p>For Customer Feedback: <a href="https://portal.bergerbd.com/leaveauto/SitePages/CapexBudget.aspx/?UniqueId=${this.uId}&mode=feedback"><b>click here</b></a></p>              
            </div>
          `,
        }
        break;
      }
      case "OpmNotification": {
        emailFldData = {
          Status: "Submitted",
          ToId: { results: [to] },
          CCId: { results: [] },
          ReviewLink: "",
          ApprovalLink: "",
          Title: "Request for 'Capex Budget' workflow with ref# " + title + " has been initiated",
          __metadata: {
            "type": "SP.Data.NotificationListListItem"
          },
          Body: `
            <div style="padding-top:0px; margin-top: 0px; font-family: verdana; color: #030e81; font-size: 12px;">              
              <p><b>Dear Concern,</b><br/>
                Request for &quot;Capex Budget&quot; workflow has been initiated to your team. Lab respectives can find it in their Pending Approval option of SharePoint Portal or from provided link in their email and can Pick up to process this task.<br/>
                <b>Request ID/Ref:&#160; ${title},</b><br/>
                Status: ${status},<br/>
                Pending with: Lab respectives,
              </p>              
            </div>
          `,
          BodyBottomText:
            `<div style="font-family: verdana; color: #030e81; font-size: 12px;">
            <p><b>Thanks & Regards,</b><br/>IT Department,<br/>Berger Paints Bangladesh Limited,<br/>Email: info@bergerbd.com<br/>
            [This is a System Generated Email from Berger Portal and no reply is required.]
            </p>                          
          </div>`,
        }
        break;
      }
      default: {
        alert("Action is undefined for this type of click event !!");
        break;
      }
    }

    let notificationlListInfo = {
      name: "NotificationList",
      item: emailFldData
    };

    this.sharepointlistService.saveListItem(notificationlListInfo)
      .then(
        (res:any) => {
          console.log('res');
        })
  }

  async saveInNotificationList(title?: string, comments?: string) {
    if (this.uId == "") {
      let req = this.pendingApprovalListInfo.item;
      //==========sending notification ===
      this.createNotification("Notification", this.logedUserAdId, req.RequestedByName, "", req.Title, req.Status);

      //approvers.push(this.allApprovers.headITInfraAdId);

      
      // this.approvers.forEach(apvr => {
      //   this.createNotification("Approval", apvr, req.RequestedByName, "", req.Title, req.Status);
      // });



      

      //this.createNotification("Notification", this.logedUserAdId, "Mostafa Kamal", "Mostafa Kamal", "Mostafa Kamal", "Mostafa Kamal");
      
      setTimeout(function () {
        let rpage = 'https://portal.bergerbd.com/leaveauto/SitePages/MyWFRequest.aspx';
        //let rpage = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
        console.log('Redirect page url');
        console.log(rpage);
        window.location.href = "https://portal.bergerbd.com/PortalResources/Home.aspx";
        //window.location.href = this.webAbsoluteUrl + "/SitePages/MyWFRequest.aspx";
      }, 4000);
    } else {
      let req = this.pendingApprovalListInfo.item;
      switch (this.childBtnClickAction) {
        case "PickedUp": {
          this.createNotification("PickedUp", this.parsedRequestInfo.RequestorAdId, this.parsedRequestInfo.RnDLabTest.Requestor.EmployeeName, "Lab personnel", this.parsedRequestInfo.Title, "PickedUp");

          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';
            //window.location.href = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
          }, 4000);

          break;
        }
        // case "ResultSubmit": {
        //   this.reportReleaseGrp.forEach(rRGrp => {
        //     this.createNotification("Approval", rRGrp.AdId, this.parsedRequestInfo.RnDLabTest.Requestor.EmployeeName, "Report Release Group", this.parsedRequestInfo.Title, "Result Submited");
        //   });
          

        //   setTimeout(function () {
        //     window.location.href = 'https://portal.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';
            
        //   }, 4000);

        //   break;
        // }
        case "Completed": {
          this.createNotification("Completed", this.parsedRequestInfo.RnDLabTest.Requestor.AdId, this.parsedRequestInfo.RnDLabTest.Requestor.EmployeeName, "", this.parsedRequestInfo.Title, "Completed");

          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';
            //window.location.href = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
          }, 4000);

          break;
        }
        case "FeedbackSubmit": {
          this.createNotification("FeedbackSubmitted", 255, this.parsedRequestInfo.RnDLabTest.Requestor.EmployeeName, "", this.parsedRequestInfo.Title, "FeedbackSubmitted");

          setTimeout(function () {
            window.location.href = 'https://portal.bergerbd.com/_layouts/15/PendingApproval/PendingApproval.aspx';
            //window.location.href = this.webAbsoluteUrl + '/SitePages/MyWFRequest.aspx';
          }, 4000);

          break;
        }
      }
    }
  }


  async createAuditLog(title: string, comments?: string) {
    let comment = (comments == undefined) ? "" : comments;
    let auditLogData = {
      Title: title,
      ActionDate: new Date().toLocaleString(),
      ActionBy: this.createReqInfoFrmChild.Requestor.EmployeeName,
      Comments: comment
    }
    let auditLogListInfo = {
      name: "CapexBudgetAuditLog",
      item: auditLogData
    }
    await this.sharepointlistService.saveListItem(auditLogListInfo).then(
      (res:any) => {})
  }

  async createReqTitle(updatedMstrLstInfo:any) {
    await this.sharepointlistService.updateListItem(updatedMstrLstInfo).then(
      (res:any) => {
        this.sharepointlistService.saveListItem(this.pendingApprovalListInfo)
          .then(
            (res:any) => {
              this.createAuditLog(this.pendingApprovalListInfo.item.Title);
            })
          .then((res:any) => {
            this.saveInNotificationList();
          })
      });
  }

  //========= update application having uId===
  async updateRequest(data:any) {
    await this.sharepointlistService.updateListItem(data)
      .then(
        (res:any) => {
          this.updateInPendingApvrList(this.pendingApprovalListInfo)
        })
      .then((res:any) => {
        this.createAuditLog(this.parsedRequestInfo.Title, this.auditLogComments);
      })
      .then((res:any) => {
        this.saveInNotificationList();
      });
  }

  async getBtnClickAction(valFrmChild: any) {
    

    this.childBtnClickAction = valFrmChild;
    let _status = '';
    let _pendingWith:any = [];
    let _updatedMstrListData;
    let _itemData;

    switch (this.childBtnClickAction) {
      case "Submitted": {
        //==== validate whether requestor info is exist or not===
        if(this.createReqInfoFrmChild.Requestor.EmployeeName == null
          || this.createReqInfoFrmChild.Requestor.EmployeeId == null
          || this.createReqInfoFrmChild.Requestor.Email == null){
            alert("Requestor info is not found. Please try again later.");
            return false;
          }
        //---- validate whether requestor info is exist or not ends ----
        


       

        this.createReqInfoFrmChild.Requestor.AdId = this.logedUserAdId;
        this.createReqInfoFrmChild.Requestor.RequestDate = new Date().toString().substring(4, 15);

        //let approvalLink = "";

        let approvers:any = [];

        let allItems = this.createReqInfoFrmChild.Datagridcrudhomeitems;
        let _status = "SubmittedToITInfra";

        for(let i = 0; i< allItems.length; i++){
          if(this.createReqInfoFrmChild.Datagridcrudhomeitems[i]['ClassCode'] == 3200 || this.createReqInfoFrmChild.Datagridcrudhomeitems[i]['ClassCode'] == 6300){
            approvers=[];
            approvers.push(this.allApprovers.headITInfraAdId);
            i = this.createReqInfoFrmChild.Datagridcrudhomeitems.length;
          }else{
            approvers.push(this.allApprovers.headAssetAdId);
            _status = "SubmittedToCCAI";
          }
        }

        // if(approvers.length == 0){
        //   approvers.push(this.allApprovers.headAssetAdId)
        // }  
        
        //====get approval history===
        let actionComments = "";
        let actionlog = {
          Date: new Date(),
          ActionBy: this.createReqInfoFrmChild.Requestor.EmployeeName,
          //ActionById: this.logedUserAdId,
          Comments: actionComments
        }
        this.createReqInfoFrmChild.ApprovalHistory.push(actionlog);
        //-------------------

        let itemData = {
          Status: _status,
          CapexBudgetProposal: JSON.stringify(this.createReqInfoFrmChild),
          PendingWithId: {
            'results': approvers
          },
        }
        let listInfo ={
          name: "CapexBudgetMaster",
          item: itemData
        }

        //====== 1.  save Masterlist ======
        await this.sharepointlistService.saveListItem(listInfo)
          .then(
            (res) => {
              this.reviewLink = 'https://portaldv.bergerbd.com/leaveauto/SitePages/CapexBudget.aspx?UniqueId=' + res.GUID + "&mode=read";
              this.approvalLink = 'https://portaldv.bergerbd.com/leaveauto/SitePages/CapexBudget.aspx?UniqueId=' + res.GUID ;
              
              //====get approval history===
              let actionComments = "";
              let actionlog = {
                Data: new Date(),
                ActionBy: this.createReqInfoFrmChild.Requestor.Name,
                Comments: actionComments
              }
              this.createReqInfoFrmChild.ApprovalHistory.push(actionlog);
              //-------------------

              let itemData = {
                Title: "CBP-" + res.ID,
                CapexBudgetProposal: JSON.stringify(this.createReqInfoFrmChild),
                ApprovalLink: this.approvalLink 
                // PendingWithId: {
                //   'results': this.labResponsibles
                // },
              }
              this.updatedMstrLstInfo = {
                name: "CapexBudgetMaster",
                rId: res.ID,
                item: itemData
              }

              
              let pendingApprovalItemData = {
                Title: "CBP-" + res.ID,
                ProcessName: "CapexBudget",
                RequestedByName: this.createReqInfoFrmChild.Requestor.EmployeeName,
                Status: "SubmittedToITInfra",
                EmployeeID: this.createReqInfoFrmChild.Requestor.EmployeeId,
                RequestedByEmail: this.createReqInfoFrmChild.Requestor.Email,
                PendingWithId: {
                  'results': approvers
                },
                RequestLink: this.approvalLink
              };

              this.pendingApprovalListInfo = {
                name: "PendingApproval",
                item: pendingApprovalItemData
              };
            }
          ).then((res:any) => {
            this.createReqTitle(this.updatedMstrLstInfo);
          });
      }
      case "Approved": {
        //===========validation start 
        if(this.emitedDataFrmChild.Status == "SubmittedToITInfra" ){
          _pendingWith = [this.allApprovers.headAssetAdId];
          _status = "SubmittedToCCAI";
        }else{
          _pendingWith = [];
          _status = "Completed";
        }
        //-------validation ends --------
        // headITInfraEmail: "shoaib@bergerbd.com",
        // headITInfraAdId: 21,
        // headITInfraEmpId: "",
        // headIAssetName: "Mahbubur Rahman",
        // headAssetEmail: "mrahman@bergerbd.com",
        // headAssetAdId: 129,
        // headAssetEmpId: ""
        let updatedCapexBudgetItms = [this.emitedDataFrmChild.CapexBudgetProposal, this.emitedDataFrmChild.CapexBudgetProposal]


        _updatedMstrListData = {
          CapexBudgetProposal: JSON.stringify(updatedCapexBudgetItms),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        };

        this.updatedMstrLstInfo = {
          name: "CapexBudgetMaster",
          rId: this.parsedRequestInfo.ID,
          item: _updatedMstrListData
        }

        this.pendingApprovalListInfo = _updatedMstrListData;

        //-----------sample received comments -----
        this.auditLogComments = "Report has been released";

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);

        //=====Email notification =======
        //this.createNotification("Completed", 1026, "Mostafa Kamal", "Mostafa Kamal", "ST-50", "Submitted");

        break;
      }
      case "PickedUp": {
        let leftResspective;
        let a1 = this.parsedRequestInfo.PendingWith.results;  
        let allTPGrps:any =[];

        for (let s = 0; s < this.parsedRequestInfo.RnDLabTest.TestParameters.length; s++) {
          allTPGrps.push(this.parsedRequestInfo.RnDLabTest.TestParameters[s].Title.RnDSection)
        }

        // get array with unique value
        allTPGrps.filter((v:any, i:any) => allTPGrps.indexOf(v) == i);

        //or
        //let dup = [...new Set(allTPGrps)];
        

        for (let n = 0; n < this.parsedTestParameters.TestParameters.length; n++) {
          
          if (this.parsedTestParameters.TestParameters[n].Title.Title == this.emitedDataFrmChild.Title) {
            this._testParamNode = n;

            //update respective of picked test param only
            let a3 = this.parsedTestParameters.TestParameters[n].Title.Respectives;

            if(this.parsedRequestInfo.RnDLabTest.length == 1){
              _pendingWith.push(this.logedUserAdId);
            }
            else if(allTPGrps.length==1 ){
              if(this.requestInfo.RnDLabTest.length == 1){
                let result = a1.filter((u:any) => !a3.some((user:any) => user.RAdId == u.ID)); //removing own grouped respectives from all PendingWiths
  
                result.forEach((element:any) => {
                  _pendingWith.push(element.ID);
                });
                _pendingWith.push(this.logedUserAdId);    
                
              }
            }
            else{
              let result = a1.filter((u:any) => !a3.some((user:any) => user.RAdId == u.ID)); //removing own grouped respectives from all PendingWiths

              result.forEach((element:any) => {
                _pendingWith.push(element.ID);
              });
              _pendingWith.push(this.logedUserAdId);   
              
            }
            

            //filter out all respectives except picked by person of this picked test
            leftResspective = a3.filter((u:any) => (u.RAdId == this.logedUserAdId));
            this.parsedRequestInfo.RnDLabTest.TestParameters[n].Title.Respectives = leftResspective;

            if (this.parsedRequestInfo.RnDLabTest.TestParameters[n].hasOwnProperty('TestParameterStatus')) {
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestParameterStatus = "PickedUp";
            } else {
              //======adding 'TestParameterStatus' object element inside the existing 'TestParameters' object with spread operator ======
              this.parsedRequestInfo.RnDLabTest.TestParameters[n] = { ...this.parsedRequestInfo.RnDLabTest.TestParameters[n], TestParameterStatus: "PickedUp" };
            }
          }
        }

        _itemData = {
          RnDLabTest: JSON.stringify(this.parsedRequestInfo.RnDLabTest),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: "PickedUp"
        }

        this.updatedMstrLstInfo = {
          name: "RnDLabTestMaster",
          rId: this.parsedRequestInfo.ID,
          item: _itemData
        }

        //======= update PendingApprovalList start=======
        this.pendingApprovalListInfo = {
          Status: "Picked",
          PendingWithId: {
            'results': _pendingWith
          },
        }

        //-----------sample received comments -----
        this.auditLogComments = "Sample has been received by '" + this.emitedDataFrmChild.Title + "' lab personnel";

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);

        break;
      }
      case "ResultSubmit": {
        if(this.emitedDataFrmChild.PackageCondition == null
          || this.emitedDataFrmChild.TestPeriodFrom == null
          || this.emitedDataFrmChild.TestPeriodTo == null){
            alert("All of PackageCondition, TestPeriodFrom and TestPeriodTo are required !");
            return false;
          }
        //=====validation start ======
        for (let n = 0; n < this.emitedDataFrmChild.TestResults.length; n++) {
          for (let r = 0; r < this.emitedDataFrmChild.TestResults[n].Results.length; r++) {
            if(this.emitedDataFrmChild.TestResults[n].Results[r].Parameter == ""
            || this.emitedDataFrmChild.TestResults[n].Results[r].TestResult == ""
            || this.emitedDataFrmChild.TestResults[n].Results[r].Unit == ""){
              alert("All of Parameter, TestResult and Unit are required in the Test Results fields !")
              return false;
            }
          } 
        }
        //---validation ends ---------


        //======set pending with =
        let a1 = this.parsedRequestInfo.PendingWith.results; //get all pendingWith people 
        let result = a1.filter((u:any) => u.ID != this.logedUserAdId); //removing own grouped respectives from all PendingWiths

        result.forEach((element:any) => {
          _pendingWith.push(element.ID); //including other group pendingWith people
        });

        // this.reportReleaseGrp.forEach(rGrp => {
        //   _pendingWith.push(rGrp.AdId); //including report release group responsibles
        // });


        for (let n = 0; n < this.parsedTestParameters.TestParameters.length; n++) {
          if (this.parsedTestParameters.TestParameters[n].Title.Title == this.emitedDataFrmChild.Title) {

            if (this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestParameterStatus &&
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestParameterStatus == "PickedUp") {

              this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestResults = this.emitedDataFrmChild.TestResults;
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].PackageCondition = this.emitedDataFrmChild.PackageCondition;
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].PacComments = this.emitedDataFrmChild.PacComments;
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestPeriodFrom = this.emitedDataFrmChild.TestPeriodFrom;
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestPeriodTo = this.emitedDataFrmChild.TestPeriodTo;
              this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestParameterStatus = "Reported";
            }

          }
        }

        for (let n = 0; n < this.parsedRequestInfo.RnDLabTest.TestParameters.length; n++) {
          if (this.parsedRequestInfo.RnDLabTest.TestParameters[n].hasOwnProperty("TestParameterStatus")) {
            if (this.parsedRequestInfo.RnDLabTest.TestParameters[n].TestParameterStatus == "PickedUp") {
              _status = "PartiallyReported";
            } else { _status = "Reported"; }
          } else {
            _status = "PartiallyReported";
          }
        }

        _itemData = {
          RnDLabTest: JSON.stringify(this.parsedRequestInfo.RnDLabTest),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        }

        this.updatedMstrLstInfo = {
          name: "RnDLabTestMaster",
          rId: this.parsedRequestInfo.ID,
          item: _itemData
        }

        //======= update PendingApprovalList start=======
        this.pendingApprovalListInfo = {
          Status: _status,
          PendingWithId: {
            'results': _pendingWith
          },
        }
        //-----------update PendingApprovalList ends -----

        //-----------sample received comments -----
        this.auditLogComments = "Report has been released by '" + this.emitedDataFrmChild.Title + "' lab personnel";

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);

        break;
      }
      case "Completed": {
        //===========validation start 
        if(this.emitedDataFrmChild.RnDLabTest.ReportNote == ""){
          alert( "Report Note is required !" );
          return false;
        }
        //-------validation ends --------
        _pendingWith = [];
        _status = "Completed";

        _updatedMstrListData = {
          RnDLabTest: JSON.stringify(this.emitedDataFrmChild.RnDLabTest),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        };

        this.updatedMstrLstInfo = {
          name: "RnDLabTestMaster",
          rId: this.parsedRequestInfo.ID,
          item: _updatedMstrListData
        }

        this.pendingApprovalListInfo = _updatedMstrListData;

        //-----------sample received comments -----
        this.auditLogComments = "Report has been released";

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);

        //=====Email notification =======
        //this.createNotification("Completed", 1026, "Mostafa Kamal", "Mostafa Kamal", "ST-50", "Submitted");

        break;
      }
      case "FeedbackSubmit": {
        _pendingWith = [];
        _status = "FeedbackSubmitted";

        _itemData = {
          RnDLabTest: JSON.stringify(this.parsedRequestInfo.RnDLabTest),          
          Status: _status
        }

        

        _updatedMstrListData = {
          RnDLabTest: JSON.stringify(this.emitedDataFrmChild.RnDLabTest),
          PendingWithId: {
            'results': _pendingWith
          },
          Status: _status
        };

        this.updatedMstrLstInfo = {
          name: "RnDLabTestMaster",
          rId: this.parsedRequestInfo.ID,
          item: _updatedMstrListData
        }

        this.pendingApprovalListInfo = _updatedMstrListData;

        //-----------sample received comments -----
        this.auditLogComments = "Feedback has been submitted.";

        //=========calling function to update data ======
        this.updateRequest(this.updatedMstrLstInfo);
        //alert("Action is undefined for this feedback type of click event !!");
        break;
      }
      default: {
        alert("Action is undefined for this type of click event !!");
        break;
      }
      
    }
  }

  updateInPendingApvrList(itemData:any) {
    this.listInfo.name = "PendingApproval";
    this.listInfo.select = 'ID' + "," + 'Title';
    this.listInfo.expand = 'Author' + "," + 'PendingWith';
    this.listInfo.filterBy = 'Title';
    this.listInfo.filterWith = this.parsedRequestInfo.Title;
    this.listInfo.top = 1;

    from(
      this.sharepointlistService.getFilteredItemsWithoutExpand(this.listInfo)
    ).subscribe(
      (res) => {
        let listInfo = {
          name: "PendingApproval",
          rId: res[0].ID,
          item: itemData
        }

        this.sharepointlistService.updateListItem(listInfo);
      }
    )
  }

  //=============for customer feedback =========
  onRatingChanged(rating:any){
    this.emitedDataFrmChild = rating;
    //console.log(rating);
    //this.feedback = rating;
    //this.rating = rating;
  }

  //=============get employee info===============
  async getEmpInfo(empADId:any){
    //===== for portaldv and or portal =====
    this.listInfo.name = "BergerEmployeeInformation";
    this.listInfo.select = 'Company'+","+'EmployeeId'+","+'EmployeeName'+","+'OfficeLocation'+","+'Designation'+","+'Department'+","+'CostCenter'+","+'Email/ID'+","+'Email/EMail'+","+'OptManagerEmail/ID'+","+'OptManagerEmail/Title'+","+'OptManagerEmail'+","+'Mobile';
    this.listInfo.expand = 'Email'+","+'OptManagerEmail';
    this.listInfo.filterBy = 'Email/ID';
    this.listInfo.top = 100000;

    let requestorsInfoData ={};
    
    await from(
        this.sharepointlistService.getItemsWithFilterExpand(this.listInfo, empADId)
        ).subscribe(
          (res) =>{ 
                
                requestorsInfoData ={
                  EmployeeName: res[0].EmployeeName,
                  Company: res[0].Company,
                  EmployeeId: res[0].EmployeeId,
                  OfficeLocation: res[0].OfficeLocation,
                  Designation: res[0].Designation,
                  Department: res[0].Department,
                  Email: res[0].Email.EMail,
                  CostCenter: res[0].CostCenter,
                  Mobile: res[0].Mobile,
                  OpmEmail: res[0].OptManagerEmail,
                  OpmADId: res[0].OptManagerEmail.ID,
                  OpmName: res[0].OptManagerEmail.Title,
                  RequestDate: new Date().toString().substring(4, 15)
                };
            
          },    
          (err) => {
              console.log(err)
          },
        );
        
        return requestorsInfoData;
   
  }

  excelDataLoadedInChild(valFrmChild: any) {
    if (this.uId == "") {
      this.dataFrmExcelUpload = valFrmChild;
    }
    else {
      this.dataFrmExcelUpload = valFrmChild;
    }

  }

}

