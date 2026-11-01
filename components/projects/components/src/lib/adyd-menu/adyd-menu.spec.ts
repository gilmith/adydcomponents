import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdydMenu } from './adyd-menu';

describe('AdydMenu', () => {
  let component: AdydMenu;
  let fixture: ComponentFixture<AdydMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdydMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(AdydMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
