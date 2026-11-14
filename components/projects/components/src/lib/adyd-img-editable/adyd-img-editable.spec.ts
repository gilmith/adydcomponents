import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdydImgEditable } from './adyd-img-editable';

describe('AdydImgEditable', () => {
  let component: AdydImgEditable;
  let fixture: ComponentFixture<AdydImgEditable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdydImgEditable],
    }).compileComponents();

    fixture = TestBed.createComponent(AdydImgEditable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
