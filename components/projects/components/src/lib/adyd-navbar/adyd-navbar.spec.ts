import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdydNavbar } from './adyd-navbar';

describe('AdydNavbar', () => {
  let component: AdydNavbar;
  let fixture: ComponentFixture<AdydNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdydNavbar],
    }).compileComponents();

    fixture = TestBed.createComponent(AdydNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
