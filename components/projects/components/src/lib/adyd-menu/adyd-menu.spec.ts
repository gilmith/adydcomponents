import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AdydMenu } from './adyd-menu';
import { AUTH_SERVICE, AuthService } from '../services/auth-service';

const authService: AuthService = {
  hasPermission: () => true,
  logout: () => {},
  getUser: () => 'Test User',
};

describe('AdydMenu', () => {
  let component: AdydMenu;
  let fixture: ComponentFixture<AdydMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdydMenu],
      providers: [
        provideRouter([]),
        { provide: AUTH_SERVICE, useValue: authService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdydMenu);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('menuName', 'Test User');
    fixture.componentRef.setInput('menuElements', []);
    fixture.componentRef.setInput('logout', false);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
