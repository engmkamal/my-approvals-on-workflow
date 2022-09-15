// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class GlobalStateService {

//   constructor() { }
// }
//===========================
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  #state$ = new BehaviorSubject<any>(null);
  state$!: Observable<any>;

  constructor() {
    this.state$ = this.#state$.asObservable();
  }

  sendData(data: any) {
    this.#state$.next(data);
  }
}

