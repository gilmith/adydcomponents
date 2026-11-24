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
  /** Variante cromática de la tarjeta. */
  public theme = input<'parchment' | 'crimson' | 'gold' | 'arcane'>('parchment');

  /** Esquinas decorativas: se duplican desde el mismo símbolo del sprite. */
  protected readonly corners = ['tl', 'tr', 'bl', 'br'] as const;


}
