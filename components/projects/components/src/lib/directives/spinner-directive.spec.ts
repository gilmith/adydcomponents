import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SpinnerDirective } from './spinner-directive';

@Component({
  imports: [SpinnerDirective],
  template: `<div [spinner]="true"></div>`,
})
class HostComponent {}

describe('SpinnerDirective', () => {
  it('creates the spinner component when enabled', async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('adyd-spinner')).toBeTruthy();
  });
});
