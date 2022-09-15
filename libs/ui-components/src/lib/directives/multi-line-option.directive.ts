import { AfterContentInit, ContentChildren, Directive, ElementRef, QueryList } from '@angular/core';
import { MatLine, setLines } from '@angular/material/core';
import { MatLineModule } from '@angular/material/core';

@Directive({
  selector: 'mat-option[multi-line-option], mat-option[multiLineOption]',
  // tslint:disable-next-line: no-host-metadata-property
  standalone: true,
  host: {
    'class': 'multi-line-option'
  },
  exportAs: 'multiLineOption'
  
})
export class MultiLineOptionDirective implements AfterContentInit {

  @ContentChildren(MatLine, { descendants: true, read: MatLine })
  public lines!: QueryList<MatLine>;

  constructor(
    protected element: ElementRef<HTMLElement>
  ) { }

  public ngAfterContentInit(): void {
    setLines(this.lines, this.element);
  }

}