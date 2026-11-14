import {Component, contentChildren, signal} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';
import {AdydTab} from './adyd-tab';

@Component({
  imports: [
    NgTemplateOutlet
  ],
  selector: 'adyd-nav-tab',
  styleUrl: './adyd-nav-tab.css',
  templateUrl: './adyd-nav-tab.html',
})
export class AdydNavTab {

  protected readonly tabs = contentChildren(AdydTab);

  protected readonly activeTab = signal(0);

  protected selectTab(index: number): void {
    this.activeTab.set(index);
  }
}
