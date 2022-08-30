import { Directive, ElementRef, AfterContentChecked } from '@angular/core';

@Directive({
             selector: '[scrollBottom]'
           })
export class ScrollBottomDirective implements AfterContentChecked {

  constructor(private el: ElementRef) {
  }

  ngAfterContentChecked(): void {
    const topPos = this.el.nativeElement.scrollHeight;
    this.el.nativeElement.scrollTop = topPos;
  }

}
