import {Component, input} from '@angular/core';

@Component({
  imports: [],
  selector: 'adyd-spinner',
  styleUrl: './adyd-spinner.css',
  templateUrl: './adyd-spinner.html',
})
export class AdydSpinner {

  /** Diseño del spinner. */
  public variant = input<'astrolabe' | 'd20'>('astrolabe');

  /** Tamaño del spinner. */
  public size = input<'sm' | 'md' | 'lg'>('md');

}
