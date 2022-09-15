import { Component, Input, OnInit } from '@angular/core';

//import { QuestionService }        from './question.service';
//import { DynamicFormDialogComponent }   from './dynamic-form-dialog.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators }        from '@angular/forms';

//import { RequestorComponent } from '@portal/ui-components';

@Component({
  selector: 'portal-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.scss'],  
  //providers:  [QuestionService]
})
export class GetstartedComponent implements OnInit {
  //questions: any[];
  _form: FormGroup;

  requestorsInfo:any;

  linkAccountsForm: FormGroup;
  

  question = {
    key: 'brave',
    label: 'Bravery Rating',
    options: [
      {key: 'solid',  value: 'Solid'},
      {key: 'great',  value: 'Great'},
      {key: 'good',   value: 'Good'},
      {key: 'unproven', value: 'Unproven'}
    ],
    order: 3
  }

  @Input() linkAccounts!: FormGroup;
  @Input() step!: number;
  @Input() submitted!: boolean;


  constructor(private formBuilder: FormBuilder,) {
    this._form = this.formBuilder.group({
        //TestParameters: this.fb.array([])
    });

    this.linkAccountsForm = this.formBuilder.group({})
    //console.log('');
  }

  // constructor(service: QuestionService, public dialog: MatDialog) {
  //   this.questions = service.getQuestions();
  // }

  ngOnInit(): void {
    //this._createForm();

    console.log("");

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
  }

  openDialog() {
    // const dialogRef = this.dialog.open(DynamicFormDialogComponent, {
    //   width: '450px',
    //   data: {questions: this.questions}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   // console.log('The dialog was closed');
    // });
  }


  private _createForm() {
    this._form = this.formBuilder.group({
        TestParameters: this.formBuilder.array([])
    });


    this.linkAccountsForm = this.formBuilder.group({
      bank: this.formBuilder.group({
        bank_name: [null, Validators.required],
        account_name: [null, Validators.required],
        account_number: [null, Validators.required],
        swift_code: [null, Validators.required],
      }),
      credit_card: this.formBuilder.group({
        name: [null, Validators.required],
        card_number: [null, Validators.required],
        cvc: [null, Validators.required],
        exp_date: [null, Validators.required],
      }),
    });
  }
  
}
