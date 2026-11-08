import {Component, input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AdydTooltipDirective} from "../directives/adyd-tooltip-directive";

@Component({
    imports: [
        ReactiveFormsModule,
        AdydTooltipDirective
    ],
  selector: 'adyd-card',
  templateUrl: './adyd-card.html',
  styleUrls: [
    './adyd-card.css',
    '../adyd-forms.css'
  ],
  standalone: true
})
export class AdydCard {

  public id = input.required<number>();
  public tooltipText = input<string>('');


}
