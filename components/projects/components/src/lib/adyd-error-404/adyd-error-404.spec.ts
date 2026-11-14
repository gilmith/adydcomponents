import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdydError404 } from './adyd-error-404';

describe('AdydError404', () => {
  let component: AdydError404;
  let fixture: ComponentFixture<AdydError404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdydError404],
    }).compileComponents();

    fixture = TestBed.createComponent(AdydError404);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
