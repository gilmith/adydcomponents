import { Component } from '@angular/core';
import { AdydError404 } from './adyd-error-404/adyd-error-404';

@Component({
  imports: [AdydError404],
  selector: 'lib-components',
  styles: ``,
  template: ` <adyd-error-404></adyd-error-404> `,
})
export class Components {}
