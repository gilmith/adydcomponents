import {Directive, ElementRef, effect, input, OnDestroy, OnInit} from '@angular/core';
import * as bootstrap from 'bootstrap';

@Directive({
  selector: '[tooltipText]',
  standalone: true
})
export class AdydTooltipDirective implements OnInit, OnDestroy {

  tooltipText = input.required<string>();
  tooltipPlacement = input<string>('top');
  private tooltipInstance?: bootstrap.Tooltip;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if (this.tooltipText()) {
      this.elementRef.nativeElement.setAttribute('data-bs-toggle', 'tooltip');
      this.elementRef.nativeElement.setAttribute('data-bs-placement', this.tooltipPlacement());
      this.elementRef.nativeElement.setAttribute('data-bs-title', this.tooltipText());
      try {
        this.tooltipInstance = new bootstrap.Tooltip(this.elementRef.nativeElement);
      } catch (e) {
        console.error('No se pudo inicializar el tooltip de Bootstrap', e);
      }
    }
  }

  ngOnDestroy() {
    if (this.tooltipInstance) {
      this.tooltipInstance.dispose();
    }
  }

}
