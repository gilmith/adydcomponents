import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdydSpinner } from './adyd-spinner';

describe('AdydSpinner', () => {
  let component: AdydSpinner;
  let fixture: ComponentFixture<AdydSpinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdydSpinner],
    }).compileComponents();

    fixture = TestBed.createComponent(AdydSpinner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('references the astrolabe sprite parts by default', () => {
    const uses = fixture.nativeElement.querySelectorAll('use') as NodeListOf<SVGUseElement>;

    expect(uses.length).toBe(3);
    expect(uses[0].getAttribute('href')).toBe('assets/gilmith/icons/icon.svg#adnd-astrolabe-outer');
    expect(uses[1].getAttribute('href')).toBe('assets/gilmith/icons/icon.svg#adnd-astrolabe-inner');
    expect(uses[2].getAttribute('href')).toBe('assets/gilmith/icons/icon.svg#adnd-astrolabe-core');
  });

  it('references the d20 sprite parts when the variant is d20', async () => {
    fixture.componentRef.setInput('variant', 'd20');
    await fixture.whenStable();

    const uses = fixture.nativeElement.querySelectorAll('use') as NodeListOf<SVGUseElement>;

    expect(uses.length).toBe(2);
    expect(uses[0].getAttribute('href')).toBe('assets/gilmith/icons/icon.svg#adnd-d20-runes');
    expect(uses[1].getAttribute('href')).toBe('assets/gilmith/icons/icon.svg#adnd-d20-frame');
  });
});
