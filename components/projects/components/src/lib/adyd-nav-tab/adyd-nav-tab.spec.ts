import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdydNavTab } from './adyd-nav-tab';
import { AdydTab } from './adyd-tab';

@Component({
  imports: [AdydNavTab, AdydTab],
  template: `
    <adyd-nav-tab>
      <ng-template adydTab title="Uno">
        <p class="content-uno">Contenido uno</p>
      </ng-template>
      <ng-template adydTab title="Dos">
        <p class="content-dos">Contenido dos</p>
      </ng-template>
      <ng-template adydTab title="Tres">
        <p class="content-tres">Contenido tres</p>
      </ng-template>
    </adyd-nav-tab>
  `,
})
class HostComponent {}

describe('AdydNavTab', () => {
  let fixture: ComponentFixture<HostComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render one button per tab', () => {
    expect(element.querySelectorAll('.nav-link').length).toBe(3);
  });

  it('should mark the first tab as active', () => {
    const links = element.querySelectorAll<HTMLAnchorElement>('.nav-link');
    expect(links[0].classList).toContain('active');
    expect(links[1].classList).not.toContain('active');
    expect(element.querySelector('.content-uno')).toBeTruthy();
    expect(element.querySelector('.content-dos')).toBeNull();
  });

  it('should switch the active tab and content on click', async () => {
    const links = element.querySelectorAll<HTMLButtonElement>('.nav-link');
    links[1].click();
    await fixture.whenStable();

    expect(links[0].classList).not.toContain('active');
    expect(links[1].classList).toContain('active');
    expect(element.querySelector('.content-uno')).toBeNull();
    expect(element.querySelector('.content-dos')).toBeTruthy();
  });
});
