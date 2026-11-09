import {InjectionToken} from "@angular/core";

export interface AdydLink {

    routeLinkService(path: string) : void
}

export const API_ROUTER: InjectionToken<AdydLink> = new InjectionToken('API_ROUTER');
