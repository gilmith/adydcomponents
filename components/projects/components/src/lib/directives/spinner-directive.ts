import {Directive, effect, ElementRef, input, ViewContainerRef} from '@angular/core';
import {AdydSpinner} from "../adyd-spinner/adyd-spinner";

@Directive({
  selector: '[spinner]',
  standalone: true,
})
export class SpinnerDirective {

  show = input<boolean>(true, { alias: 'spinner' });
  constructor(
    private viewContainerRef: ViewContainerRef,
  ) {
    effect(() => {
      if (this.show()) {
        this.viewContainerRef.clear();
        this.viewContainerRef.createComponent(AdydSpinner);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }

}
