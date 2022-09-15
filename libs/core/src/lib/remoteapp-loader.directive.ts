// import { Directive } from '@angular/core';

// @Directive({
//   selector: '[portalRemoteappLoader]',
//   standalone: true
// })
// export class RemoteappLoaderDirective {

//   constructor() { }

// }
//=============================
import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnChanges,
  ViewContainerRef,
} from '@angular/core';
import { ModuleFedLoaderOptions } from './app-loader.interface';

import { DynamicLoaderService } from './dynamic-loader.service';

@Directive({
  selector: '[portalRemoteappLoader]',
  standalone: true
})
export class RemoteappLoaderDirective implements OnChanges {
  @Input() public portalRemoteappLoader!: ModuleFedLoaderOptions;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private loader: DynamicLoaderService,
    private cdr: ChangeDetectorRef
  ) {}
  public ngOnChanges(): Promise<void> {
    return this.loader.loadModule(
      this.viewContainerRef,
      this.portalRemoteappLoader
    ) as Promise<void>;
  }
}
