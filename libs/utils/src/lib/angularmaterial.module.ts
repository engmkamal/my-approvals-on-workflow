// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class AngularmaterialModule { }

//========================================================


 import { NgModule } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { FlexLayoutModule } from '@angular/flex-layout';
 import { MatAutocompleteModule } from '@angular/material/autocomplete';
 import { MatButtonModule } from '@angular/material/button';
 import { MatButtonToggleModule } from '@angular/material/button-toggle';
 import { MatCardModule } from '@angular/material/card';
 import { MatCheckboxModule } from '@angular/material/checkbox';
 import { MatChipsModule } from '@angular/material/chips';
 import { MatDatepickerModule } from '@angular/material/datepicker';
 import { MatDialogModule } from '@angular/material/dialog';
 import { MatExpansionModule } from '@angular/material/expansion';
 import { MatFormFieldDefaultOptions, MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
 import { MatGridListModule } from '@angular/material/grid-list';
 import { MatIconModule } from '@angular/material/icon';
 import { MatInputModule } from '@angular/material/input';
 import { MatListModule } from '@angular/material/list';
 import { MatMenuModule } from '@angular/material/menu';
 import { MatPaginatorModule } from '@angular/material/paginator';
 import { MatProgressBarModule } from '@angular/material/progress-bar';
 import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
 import { MatRadioModule } from '@angular/material/radio';
 import { MatSelectModule } from '@angular/material/select';
 import { MatSidenavModule } from '@angular/material/sidenav';
 import { MatSliderModule } from '@angular/material/slider';
 import { MatSlideToggleModule } from '@angular/material/slide-toggle';
 import { MatSnackBarModule } from '@angular/material/snack-bar';
 import { MatSortModule } from '@angular/material/sort';
 import { MatTableModule } from '@angular/material/table';
 import { MatTabsModule } from '@angular/material/tabs';
 import { MatToolbarModule } from '@angular/material/toolbar';
 import { MatTooltipModule } from '@angular/material/tooltip';
 import { MatStepperModule } from '@angular/material/stepper';
 import { MatBadgeModule } from '@angular/material/badge';
 import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
 import { MatBottomSheetModule } from '@angular/material/bottom-sheet'; 
 import { CdkTableModule } from '@angular/cdk/table';
 import { CdkTreeModule } from '@angular/cdk/tree';
 import { CdkAccordionModule } from '@angular/cdk/accordion';
 import { A11yModule } from '@angular/cdk/a11y';
 import { BidiModule } from '@angular/cdk/bidi';
 import { OverlayModule } from '@angular/cdk/overlay';
 import { PlatformModule } from '@angular/cdk/platform';
 import { ObserversModule } from '@angular/cdk/observers';
 import { PortalModule } from '@angular/cdk/portal';
 import { MatDividerModule } from '@angular/material/divider';
  
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';


const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

 /**
  * NgModule that includes all Material modules that are required to serve the demo-app.
  */

 @NgModule({
    declarations: [],
    imports: [
      FlexLayoutModule,
      MatAutocompleteModule,
      MatButtonModule,
      MatBottomSheetModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatTableModule,
      MatDatepickerModule,
      MatDialogModule,
      MatExpansionModule,
      MatFormFieldModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatBadgeModule,
      MatSidenavModule,
      MatSlideToggleModule,
      MatSliderModule,
      MatSnackBarModule,
      MatSortModule,
      MatStepperModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatNativeDateModule,
      CdkTableModule,
      A11yModule,
      BidiModule,
      CdkAccordionModule,
      ObserversModule,
      OverlayModule,
      PlatformModule,
      PortalModule,
      MatDividerModule,
      DragDropModule,
      ScrollingModule,
      CdkStepperModule      
    ],
     exports: [
        CdkTreeModule,
         MatAutocompleteModule,
         MatButtonModule,
         MatBottomSheetModule,
         MatButtonToggleModule,
         MatCardModule,
         MatCheckboxModule,
         MatChipsModule,
         MatTableModule,
         MatDatepickerModule,
         MatDialogModule,
         MatExpansionModule,
         MatFormFieldModule,
         MatGridListModule,
         MatIconModule,
         MatInputModule,
         MatListModule,
         MatMenuModule,
         MatPaginatorModule,
         MatProgressBarModule,
         MatProgressSpinnerModule,
         MatRadioModule,
         MatRippleModule,
         MatSelectModule,
         MatBadgeModule,
         MatSidenavModule,
         MatSlideToggleModule,
         MatSliderModule,
         MatSnackBarModule,
         MatSortModule,
         MatStepperModule,
         MatTabsModule,
         MatToolbarModule,
         MatTooltipModule,
         MatNativeDateModule,
         CdkTableModule,
         A11yModule,
         BidiModule,
         CdkAccordionModule,
         ObserversModule,
         OverlayModule,
         PlatformModule,
         PortalModule,
         MatDividerModule,
         DragDropModule,
         ScrollingModule,
         CdkStepperModule
    ],
    providers: [
      {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: appearance
      }
    ],
 })
 export class AngularmaterialModule { }
 

