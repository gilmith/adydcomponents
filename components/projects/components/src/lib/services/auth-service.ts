import { InjectionToken} from "@angular/core";

export interface AuthService {

    hasPermission(permission: string[]): boolean;
}

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE');
