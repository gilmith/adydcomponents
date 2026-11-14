import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Components } from './components';
import { AdydError404 } from './adyd-error-404';

describe('Components', () => {
  let component: Components;
  let fixture: ComponentFixture<Components>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Components],
    }).compileComponents();

    fixture = TestBed.createComponent(Components);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
