
import { ResizedEvent } from 'angular-resize-event';

import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';

import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Subject, merge, of } from 'rxjs';
import { tap, auditTime, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'portal-dragndresizeable',
  templateUrl: './dragndresizeable.component.html',
  styleUrls: ['./dragndresizeable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragndresizeableComponent implements OnInit {

  opened: boolean;
  isCardExpanded = false;

  // width: number;
  // height: number;

  public style: object = {};

  @Output() resized = new EventEmitter<DOMRect>();

  private startSize$ = new Subject<DOMRect>();
  private dragMove$ = new Subject<CdkDragMove>();
  private dragMoveAudited$ = this.dragMove$.pipe(
    withLatestFrom(this.startSize$),
    auditTime(16),
    tap(([{ distance }, rect]) => {
      this.el.nativeElement.style.width = `${rect.width + distance.x}px`;
      this.el.nativeElement.style.height = `${rect.height + distance.y}px`;
    })
  );

  sub$ = merge(this.dragMoveAudited$, of(true));

  width: number;
  height: number;

  constructor(private el: ElementRef<HTMLElement>) {
    this.opened = true;
    this.width = 310;
    this.height = 350;
  }

  ngOnInit(): void {
    console.log("Draggable and resizable component initialized !");
  }

  expand() {
    if(this.opened){
      this.opened = false;
    }
    this.isCardExpanded = !this.isCardExpanded;
  }

  onResized(event: ResizedEvent) {
    this.width = event.newRect.width;
    this.height = event.newRect.height;

    console.log('width', this.width);
    console.log('height', this.height);   
    
    //alert("onResized called !!!");

    this.style = {
      //position: 'fixed',
      //left: `250px`,
      //top: `260px`,
      width: `${this.width}px`,
      height: `${this.height}px`
    };
  }

  dragStarted(): void {
    this.startSize$.next(this.el.nativeElement.getBoundingClientRect());
  }

  dragEnded($event: CdkDragEnd): void {
    $event.source._dragRef.reset();
    this.resized.emit(this.el.nativeElement.getBoundingClientRect());
  }

  dragMoved($event: CdkDragMove): void {
    this.dragMove$.next($event);
  }

}
