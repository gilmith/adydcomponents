import {Component, input} from '@angular/core';

@Component({
  imports: [],
  selector: 'adyd-card',
  styleUrl: './adyd-card.css',
  templateUrl: './adyd-card.html',
})
export class AdydCard {

  imageUrl = input.required<string>();
  title = input.required<string>();

}
