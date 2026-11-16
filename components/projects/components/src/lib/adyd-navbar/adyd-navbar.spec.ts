import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AdydNavbar } from './adyd-navbar';
import { AUTH_SERVICE, AuthService } from '../services/auth-service';

const authService: AuthService = {
  hasPermission: () => true,
  logout: () => {},
  getUser: () => 'Test User',
};

describe('AdydNavbar', () => {
  let component: AdydNavbar;
  let fixture: ComponentFixture<AdydNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdydNavbar],
      providers: [
        provideRouter([]),
        { provide: AUTH_SERVICE, useValue: authService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdydNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
