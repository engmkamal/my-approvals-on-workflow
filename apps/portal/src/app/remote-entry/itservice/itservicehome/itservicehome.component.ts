import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
//import { ResizeEvent } from 'angular-resizable-element';
//import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'portal-itservicehome',
  templateUrl: './itservicehome.component.html',
  styleUrls: [
    './itservicehome.component.scss'
  ],
})
export class ItservicehomeComponent implements OnInit, OnDestroy, AfterViewInit {
  
  mobileQuery: MediaQueryList;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Sidebar Item ${i + 1}`);

  
  isCardExpanded = false; //== Mat Card ==

  // fillerContent = Array.from(
  //   {length: 50},
  //   () =>
  //     `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  //      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  //      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  //      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  //      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  // );

  private _mobileQueryListener: () => void;

  // todo = [
  //   'Create Request',
  //   'Getting Started', 
  //   'Approval Flow', 
  //   'Dashboard'
  // ];

  opened!: boolean;

  dragPosition = {x: 0, y: 0};

  requestInfo: any = {};

  requestInfo2: any = {};

  requestInfo3: any = {};

  _matcardInfo = { 
    dragPosition: {x: 10, y: 10},
    divStyle: {
      resize: 'both',
      overflow: 'hidden',
      width: '310px',
      height: '110px',
      background: '#CC3B5D'
    },
    matCardTitle: 'Create New Request',
    matCardSubtitle: '',
    matCardContent: '',
    matCardImage: '',
    matCardActions: '',
    matCardFooter: '',
  };

  _matcardInfo2 = { 
    dragPosition: {x: 380, y: 10},
    divStyle: {
      resize: 'both',
      overflow: 'hidden',
      width: '310px',
      height: '110px',
      background: '#D9AB29'
    },
    matCardTitle: 'Approval Flow',
    matCardSubtitle: '',
    matCardContent: '',
    matCardImage: '',
    matCardActions: '',
    matCardFooter: '',
  };

  _matcardInfo3 = { 
    dragPosition: {x: 750, y: 10},
    divStyle: {
      resize: 'both',
      overflow: 'hidden',
      width: '310px',
      height: '110px',
      background: 'purple'
    },
    matCardTitle: 'Dashboard',
    matCardSubtitle: '',
    matCardContent: '',
    matCardImage: '',
    matCardActions: '',
    matCardFooter: '',
  };

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);    

    this.opened = true; //for open side nav onInit
    
  }

  ngOnInit(): void {
    const divStyle = {
      resize: 'both',
      overflow: 'auto',
      width: '310px',
      height: '350px',
    };

    //this._matcardInfo.divStyle = divStyle;

    this.requestInfo = {
      uId: "",
      readMode: "",
      Status: "",
      MatcardInfo: this._matcardInfo 
    };

    this.requestInfo2 = {
      uId: "",
      readMode: "",
      Status: "",
      MatcardInfo: this._matcardInfo2 
    };

    this.requestInfo3 = {
      uId: "",
      readMode: "",
      Status: "",
      MatcardInfo: this._matcardInfo3 
    };
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {    
    console.log("");
  }

  changePosition() {
    this.dragPosition = {x: this.dragPosition.x + 50, y: this.dragPosition.y + 50};
  }

  GetOutputVal(valFrmChild: any) {
    //this.emitedDataFrmChild = valFrmChild;


    this.opened = valFrmChild.compData.opened;
    this.isCardExpanded = valFrmChild.compData.isCardExpanded;

    // const _comData = {
    //   opened : false,
    //   isCardExpanded: !this.isCardExpanded
    // }
    // const data = {
    //   compData : _comData
    // }
    // this.outputToParent.emit(data);

    // if(this.opened){
    //   this.opened = false;
    // }
    // this.isCardExpanded = !this.isCardExpanded;
    // if (this.uId == "") {
    //   this.createReqInfoFrmChild = valFrmChild;
    // }
    // else {
    //   this.emitedDataFrmChild = valFrmChild;
    // }

  }
}

