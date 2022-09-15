// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'portal-supporthome',
//   templateUrl: './supporthome.component.html',
//   styleUrls: ['./supporthome.component.scss']
// })
// export class SupporthomeComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
//========================================


import { Component, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import { UserService } from '@portal/shared/data-access-user';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';




@Component({
  selector: 'portal-supporthome',
  templateUrl: './supporthome.component.html',
  styleUrls: ['./supporthome.component.scss'],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
})
export class SupporthomeComponent implements OnInit {

  mobileQuery: MediaQueryList;      
  isCardExpanded = false; //== Mat Card ==
  private _mobileQueryListener: () => void;
  opened!: boolean;
  dragPosition = {x: 0, y: 0};
  requestInfo: any = {};

  _form!: FormGroup;

  requestorsInfo:any;

  isLoggedIn$ = this.userService.isUserLoggedIn$;
  showLoginFrm = false;

  nav_position = 'end';
  openedStartDrawer!: boolean;
  openedEndDrawer!: boolean;

  //---for mat card static data ---
  _matcardInfo = { 
    dragPosition: {x: 10, y: 10},
    divStyle: {
      resize: 'both',
      overflow: 'hidden',
      width: '340px',
      height: '300px',
      background: 'whitesmoke'//'#87AFC7'
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

  constructor(
    private formBuilder: FormBuilder,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private router: Router) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);   

      this.opened = false; //for open side nav onInit
      this.openedStartDrawer = false;
      this.openedEndDrawer = false;
    }

  ngOnInit(): void {
    //==============checking login authorization ===========
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        if (!loggedIn) {
          this.showLoginFrm = true;
          //this.userService.login('Demo-User', '', '');      
          
        } else {
          this.showLoginFrm = false;
          //this.router.navigate([`${this.router.url}`]);
          //this.router.navigateByUrl('');
        }
      });  
    //---------------------------
    this._createForm();    

    this.requestorsInfo = {
      EmployeeName: 'Kamal',
      Company: 'BPBL',
      EmployeeId: '1270',
      OfficeLocation: 'Corporate',
      Designation: 'Kamal',
      Department: 'Kamal',
      Email: 'Kamal',
      CostCenter: '444444',
      Mobile: '345464',
      RequestDate: '2022'
    };


    //----------for mat card------
    
    this.requestInfo = {
      uId: "",
      readMode: "",
      Status: "",
      MatcardInfo: this._matcardInfo 
    };
  }

  private _createForm() {
    this._form = this.formBuilder.group({
        TestParameters: this.formBuilder.array([])
    });
  }

  ddlChangeSelection(e:any){    
    //this.openedStartDrawer = true;
    this.openedEndDrawer = true;
  }

  GetOutputVal(valFrmChild: any) {
    console.log("");
  }

  
}



