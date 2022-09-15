// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'portal-editable-cell-renderer',
//   templateUrl: './editable-cell-renderer.component.html',
//   styleUrls: ['./editable-cell-renderer.component.scss']
// })
// export class EditableCellRendererComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
//=======================
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'portal-editable-cell-renderer',
  templateUrl: './editable-cell-renderer.component.html',
  styleUrls: ['./editable-cell-renderer.component.scss'],
  // template: `
  //   <div class="actions-container" >
  //     <div  *ngIf="!isGroupNode">
  //       <button
  //       mat-stroked-button
  //       (click)="onToggleEditable($event)">
  //       {{buttonEditableText}}
  //       </button>


  //       <button
  //         type="button"
  //         color="primary"
  //         mat-stroked-button
  //         color="warn"
  //         (click)="onDeleteRow($event)"
  //         >
  //         Delete
  //       </button>
  //     <div>
  //   </div>
  // `,

})
export class EditableCellRendererComponent implements OnInit {
  params: any;
  buttonEditableText:any;
  isGroupNode!: boolean;

  agInit(params: any): void {
    this.params = params;
    this.isGroupNode = params.node.group;
    if (!this.isGroupNode) { this.buttonEditableText = params.node.data.editable === true ? 'disable' : 'enable'; }
  }

  ngOnInit() {
    console.log("ngOnInit of EditableCellRendererComponent initialized !");
  }

  onToggleEditable(e?:any) {
    this.params.toggleEditable(this.params.node.data.id);
  }

  onDeleteRow(e?:any) {
    this.params.deleteRow(this.params.node.data.id);
  }
}

