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
    fixture.componentRef.setInput('imageUrl', 'https://picsum.photos/600/337');
    fixture.componentRef.setInput('title', 'Dragonlance');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the image with the title as alt text', () => {
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(img.src).toBe('https://picsum.photos/600/337');
    expect(img.alt).toBe('Dragonlance');
  });
});
