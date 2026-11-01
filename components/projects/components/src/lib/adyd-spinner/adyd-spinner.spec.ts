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
});
