import { TestBed } from '@angular/core/testing';
import { PlayerDirective } from './player-directive';
import { AUTH_SERVICE, AuthService } from '../services/auth-service';
import { of, Subject } from 'rxjs';

describe('PlayerDirective', () => {
  let directive: PlayerDirective;
  let authService: AuthService;

  const createMockDirective = (hasPlayer: boolean) => {
    const templateRef = {
      createEmbeddedView: jasmine.createSpy('createEmbeddedView')
    } as any;
    const viewContainerRef = {
      clear: jasmine.createSpy('clear'),
      createEmbeddedView: jasmine.createSpy('createEmbeddedView')
    } as any;

    TestBed.configureTestingModule({
      providers: [
        PlayerDirective,
        {
          provide: AUTH_SERVICE,
          useValue: {
            hasPermission: (permissions: string[]) => {
              return permissions.includes('player') === hasPlayer;
            }
          }
        }
      ]
    });

    const inject = TestBed.inject;
    directive = inject(PlayerDirective);
    directive['template'] = templateRef;
    directive['viewContainerRef'] = viewContainerRef;
    authService = inject(AUTH_SERVICE);
  };

  it('should create an instance', () => {
    createMockDirective(true);
    expect(directive).toBeTruthy();
  });

  it('should show view when user has player permission', () => {
    createMockDirective(true);
    directive.ngOnInit();
    expect(directive['viewContainerRef'].createEmbeddedView).toHaveBeenCalled();
    expect(directive['viewContainerRef'].clear).toHaveBeenCalled();
  });

  it('should not show view when user does not have player permission', () => {
    createMockDirective(false);
    directive.ngOnInit();
    expect(directive['viewContainerRef'].createEmbeddedView).not.toHaveBeenCalled();
    expect(directive['viewContainerRef'].clear).toHaveBeenCalled();
  });
});
