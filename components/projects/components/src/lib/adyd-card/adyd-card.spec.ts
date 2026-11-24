import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdydCard } from './adyd-card';

describe('AdydCard', () => {
  let component: AdydCard;
  let fixture: ComponentFixture<AdydCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdydCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AdydCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 1);
    fixture.componentRef.setInput('tooltipText', 'Información de la carta');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the ornamented card with the provided id', () => {
    const card = fixture.nativeElement.querySelector('.adnd-card') as HTMLElement;
    expect(card).toBeTruthy();
    expect(card.id).toBe('1');
    expect(card.querySelectorAll('.adnd-card-corner').length).toBe(4);
  });

  it('references the shared icon sprite instead of inlining the decorations', () => {
    const card = fixture.nativeElement.querySelector('.adnd-card') as HTMLElement;
    const cornerUse = card.querySelector('.adnd-card-corner use');
    const crestUse = card.querySelector('.adnd-card-crest use');
    const sealUse = card.querySelector('.adnd-wax-seal use');

    expect(cornerUse?.getAttribute('href')).toBe('assets/gilmith/icons/icon.svg#adnd-card-corner');
    expect(crestUse?.getAttribute('href')).toBe('assets/gilmith/icons/icon.svg#adnd-card-crest');
    expect(sealUse?.getAttribute('href')).toBe('assets/gilmith/icons/icon.svg#adnd-wax-seal-svg');
  });

  it('applies the selected theme', async () => {
    fixture.componentRef.setInput('theme', 'crimson');
    await fixture.whenStable();

    const card = fixture.nativeElement.querySelector('.adnd-card') as HTMLElement;
    expect(card.classList).toContain('adnd-card--crimson');
  });
});
