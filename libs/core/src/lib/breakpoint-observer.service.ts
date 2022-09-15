// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class BreakpointObserverService {

//   constructor() { }
// }

//=========================================================

import { Injectable, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { startWith, map, distinctUntilChanged, shareReplay, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

const QUERY: Map<string, string> = new Map([
  ['xl', '(min-width: 1200px)'],
  ['lg', '(min-width: 992px)'],
  ['md', '(min-width: 768px)'],
  ['sm', '(min-width: 576px)'],
  ['xs', '(min-width: 0px)'],
]);

@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {

  Breakpoints = Breakpoints;
  currentBreakpoint = '';
  
  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, '(min-width: 500px)'])
    .pipe(
      tap(value => console.log(value)),
      distinctUntilChanged()
    );


  //private _size$: Observable<string>;
  
  constructor(private breakpointObserver: BreakpointObserver) {
    // this._size$ = fromEvent(window, 'resize')
    //   .pipe(
    //     startWith(this._getScreenSize()),
    //     map((event: Event) => {
    //       return this._getScreenSize();
    //     }),
    //     distinctUntilChanged(),
    //     shareReplay(1)
    //   )
  }

  // ngOnInit(): void {
  //   this.breakpoint$.subscribe(() =>
  //     this.breakpointChanged()
  //   );
  // }

  // public get size$(): Observable<string> {
  //   return this._size$;
  // }

  private _getScreenSize(): string {
    const [[newSize = 'never']] = Array.from(QUERY.entries())
      .filter(([size, mediaQuery]) => window.matchMedia(mediaQuery).matches);
    return newSize;
  }

  breakpointChanged():any {
    if(this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.currentBreakpoint = Breakpoints.Large;
      return this.currentBreakpoint;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.currentBreakpoint = Breakpoints.Medium;
      return this.currentBreakpoint;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.currentBreakpoint = Breakpoints.Small;
      return this.currentBreakpoint;
    } else if(this.breakpointObserver.isMatched('(min-width: 500px)')) {
      this.currentBreakpoint = '(min-width: 500px)';
      return this.currentBreakpoint;
    }
  }

  screenWidth() {
    // if(window.innerWidth <= 767) {
    //   console.log('Mobile');
    //   // this.navOpen = false;
    // } else {
    //   console.log('Desktop');
    //   // this.navOpen = false;
    // }
    // console.log(window.innerWidth);
    return window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
  }
}


