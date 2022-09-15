// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'portal-resizable',
//   templateUrl: './resizable.component.html',
//   styleUrls: ['./resizable.component.scss'],
// })
// export class ResizableComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }

///////////==================================

import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { ResizedEvent } from 'angular-resize-event';

import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject, merge, of } from 'rxjs';
import { tap, auditTime, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'portal-resizable',
  templateUrl: './resizable.component.html',
  styleUrls: ['./resizable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResizableComponent {
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
    this.width = 320;
    this.height = 450;
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

  onResized(event: ResizedEvent) {
    this.width = event.newRect.width;
    this.height = event.newRect.height;

    console.log('width', this.width);
    console.log('height', this.height);
  }
}

