import {Directive, TemplateRef, inject, input} from '@angular/core';

@Directive({
  selector: 'ng-template[adydTab]',
})
export class AdydTab {

  public readonly title = input.required<string>();

  public readonly template = inject<TemplateRef<unknown>>(TemplateRef);
}
