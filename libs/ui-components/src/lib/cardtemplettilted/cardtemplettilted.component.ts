// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'portal-cardtemplettilted',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './cardtemplettilted.component.html',
//   styleUrls: ['./cardtemplettilted.component.scss'],
// })
// export class CardtemplettiltedComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }

//=====================================
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { Console } from 'console';
import { fromEvent } from 'rxjs'
import { map, debounceTime, tap, merge, delay, mapTo, share, repeat, switchMap, takeUntil } from 'rxjs/operators'

import { AngularmaterialModule } from '../angularmaterial.module';

@Component({
  selector: 'portal-cardtemplettilted',
  standalone: true,
  imports: [CommonModule, AngularmaterialModule],
  templateUrl: './cardtemplettilted.component.html',
  styleUrls: ['./cardtemplettilted.component.scss'],
})
export class CardtemplettiltedComponent implements OnInit {
  height:any;
  width:any;
  backgroundImage:any;
  mouseX = 0;
  mouseY = 0;
  get mousePX() {
    return this.mouseX / this.width;
  }
  get mousePY() {
    return this.mouseY / this.height;
  }

  @Input() cardBgImage!: string;
  @ViewChild('card', { static: true }) card!: ElementRef;
  cardStyling = this.cardStyle();

  private _cardInfo:any;

  @Input() cardInfo!:any;

  @Output() outputToParent: EventEmitter<any> = new EventEmitter<any>()
  // @Input()
  // set cardInfo(cardInfo) {
  //   this._cardInfo = (cardInfo && cardInfo.trim()) || '<no cardInfo set>';
  // }
 
  // get cardInfo(): string { return this._cardInfo; }

  public webAbsoluteUrl = window.location.origin;
  //public webAbsoluteUrl = "https://portal.bergerbd.com";

  routerLink!:string;

  constructor (private renderer: Renderer2){}

  
  
  cardStyle() {
    return this.transformStyle();
  }

  cardBgTransform() {

    return this.transformStyle();
  }

  private transformStyle() {    
    const tX = this.mousePX * -30;
    const tY = this.mousePY * -30;
    return { transform: `rotateY(${tX}deg) rotateX(${tY}deg)` };
  }
  get nativeElement(): HTMLElement {
    return this.card.nativeElement;
  }

  addElement() {
    

    const d: HTMLDivElement = this.renderer.createElement('div');
    d.innerHTML = `
    <div #card class="card-wrap" (click)="onClickOnCard(${this.cardInfo})">
        <div class="card" [ngStyle]="cardStyle()">
            <div class="card-bg" [ngStyle]="cardBgTransform()">            
                <div style="border: 2px solod; background-color:gainsboro; overflow: hidden; margin: 12px; padding: 5px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    <p style="padding: 5px; margin-top: 0px; height: 100px; font-family:Verdana, Geneva, Tahoma, sans-serif" [style.background-image]="'url(' + ${this.cardInfo.HomePagePicture} + ')'">
                        <span style="color:rgb(245, 228, 196); margin: auto; background-color: black; opacity: 50%;">${this.cardInfo.Title}</span>                    
                    </p>
                    <p style="background-color:white; margin-top: -40px;" class="one-edge-shadow intro">                    
                        <span [innerHTML]="${this.cardInfo.Offers}" style="color: green; text-align: center; align-content: flex-end; background-color: white; opacity: 50%; margin: 0px; padding: auto;"></span>
                    </p>                
                    <p style="font-size: 8pt; font-family: Arial, Helvetica, sans-serif; color: darkblue; margin-top: 30px;">Valid Till: ${this.cardInfo.ValidTill}</p>
                    <p style="font-size: 8pt; font-family: Arial, Helvetica, sans-serif; color: darkblue;">Contact No: ${this.cardInfo.ContactNumber}</p>
                    <span style="text-align: right; color: green; margin-left: 100px; font-weight: bold;">Read More ...</span>
                </div>
            </div>
        </div>
    </div>
    `
    this.renderer.appendChild(this.card.nativeElement, d)
  }

  ngOnInit() {
    
    const mouseMove$ = fromEvent<MouseEvent>(this.card.nativeElement, 'mousemove');
    const mouseLeave$ = fromEvent<MouseEvent>(this.card.nativeElement, 'mouseleave').pipe(
      delay(100),
      mapTo(({ mouseX: 0, mouseY: 0 })),
      share()
    )
    const mouseEnter$ = fromEvent<MouseEvent>(this.card.nativeElement, 'mouseenter').pipe(takeUntil(mouseLeave$))
      
    mouseEnter$.pipe(
      switchMap(() => mouseMove$),
      map(e => ({ mouseX: this.getMouseX(e), mouseY: 29 - this.height / 2 }))
      //map(e => ({ mouseX: e.pageX - this.nativeElement.offsetLeft - this.width / 2, mouseY: e.pageY - this.nativeElement.offsetTop - this.height / 2 }))
      , merge(mouseLeave$), repeat()
    ).subscribe(e => {
      this.mouseX = e.mouseX;
      this.mouseY = e.mouseY;      
    })

    this.routerLink = this.cardInfo.pageLink;

  }
  getMouseX(e:any){
    return (e.pageX - this.nativeElement.offsetLeft - this.width / 2);
  }
  ngAfterViewInit() {
    this.width = this.card.nativeElement.offsetWidth;
    this.height = this.card.nativeElement.offsetHeight;
  }

  onClickOnCard(e?:any) {
    this.outputToParent.emit(this.cardInfo);
    // var url = this.webAbsoluteUrl + "/mou/SitePages/Topic.aspx?RootFolder=/mou/Lists/Community Discussion/" + e.Title;
    
    // window.open(url, "_blank");

    // //window.document.getElementById('MSOZoneCell_WebPartWPQ2').style.display = 'none';
    
    // // var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=550,top=20,left=20");
    // // win.document.body.innerHTML = e.Body;

    
  }

  mouseenterOnCard(e:any){
    const srcObj = e.target.offsetParent.children["0"];
    if (srcObj.tagName == "div") {
        srcObj.setAttribute("style", srcObj.getAttribute("style").replace('backgroundColor', "red"));       
    }

    // if (srcObj.tagName == "IMG") {
    //   srcObj.setAttribute("src", srcObj.getAttribute("src").replace(regExp, "_h.svg"));       
    // }
  }

  mouseleaveOnCard(e:any){
    const srcObj = e.target.offsetParent.children["0"];
    if (srcObj.tagName == "div") {
        srcObj.setAttribute("style", srcObj.getAttribute("style").replace('backgroundColor', "blue"));       
    }

    // if (srcObj.tagName == "IMG") {
    //   srcObj.setAttribute("src", srcObj.getAttribute("src").replace(regExp, "_h.svg"));       
    // }
  }

 

 

  
}

