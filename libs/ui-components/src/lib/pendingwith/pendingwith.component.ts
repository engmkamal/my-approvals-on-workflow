// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'portal-pendingwith',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './pendingwith.component.html',
//   styleUrls: ['./pendingwith.component.scss'],
// })
// export class PendingwithComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }



//================================


import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ChangeDetectorRef, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ControlContainer, FormGroupDirective, ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
//import {default as _rollupMoment} from 'moment';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, Subscription } from 'rxjs';
import { AngularmaterialModule } from '../angularmaterial.module';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'portal-pendingwith',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AngularmaterialModule],
  templateUrl: './pendingwith.component.html',
  styleUrls: ['./pendingwith.component.scss'],  
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  encapsulation: ViewEncapsulation.Emulated
  
})

export class PendingwithComponent implements OnInit{
  conContainer: ControlContainer;
  
  public _frmGrp!: FormGroup;
  //private mediaSub: Subscription;
  //Requestor: FormGroup;
  date = new FormControl(moment());
  
  _form: FormGroup;

  @Input()
  public requestorsInfo!: any;

   @Input() formGroup!: FormGroup;

   disabled = true;

   //==========Rnd ============
   @Input() linkAccounts!: FormGroup;
   @Input() step!: number;
   @Input() submitted!: boolean;

   public bank!: FormGroup;
   @Input() parentForm!: FormGroup;
   //-----------rnd ----------

  constructor(private controlContainer: ControlContainer, 
    parent: FormGroupDirective, 
    private fb: FormBuilder,
    private mediaObserver: MediaObserver,
    //private cdRef: ChangeDetectorRef
    ) {
      this.conContainer = controlContainer;
      this.formGroup = parent.control
    //this.media$ = mediaObserver.asObservable();

    this._form = this.fb.group({
        TestParameters: this.fb.array([])
    });

    
  }  
  

  ngOnInit() {
    this._frmGrp = this.controlContainer.control as FormGroup;
    //this.addGroupToParent();
    this.bank = this.controlContainer.control as FormGroup;
    console.log("Requestor component initialized !!");
  }

  // ngOnDestroy(){
  //   if(this.mediaSub){
  //       this.mediaSub.unsubscribe();
  //   }
  // }



  private addGroupToParent() {
    const config = {
      EmployeeName: [this.requestorsInfo.EmployeeName],
      Company: [this.requestorsInfo.Company],
      EmployeeId: [this.requestorsInfo.EmployeeId],
      OfficeLocation: [this.requestorsInfo.OfficeLocation],
      Designation: [this.requestorsInfo.Designation],
      Department: [this.requestorsInfo.Department],
      Email: [this.requestorsInfo.Email],
      CostCenter: [this.requestorsInfo.CostCenter],
      Mobile: [this.requestorsInfo.Mobile],
      RequestDate: [this.requestorsInfo.RequestDate]
    };
    this._frmGrp.addControl('Requestor', this.fb.group(config));  
    
    //==============with static data =========
    // const data2 = {
    //   EmployeeName: 'Kamal',
    //   Company: "BPBL",
    //   EmployeeId: ["euriter"],
    //   OfficeLocation: ['hdskjfhdsjf'],
    //   Designation: ['jsdkfsd'],
    //   Department: ['IT'],
    //   Email: ["kamal"],
    //   CostCenter: ['yuyuiyiu'],
    //   Mobile: ['098764'],
    //   RequestDate: ['66776']
    // };

    // this._frmGrp.addControl('Requestor', this.fb.group(data2));
  }  
  
}





