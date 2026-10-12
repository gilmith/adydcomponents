import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdydSelect } from './adyd-select';

describe('AdydSelect', () => {
  let component: AdydSelect;
  let fixture: ComponentFixture<AdydSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdydSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(AdydSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
