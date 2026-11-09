import {InjectionToken} from "@angular/core";

export interface AdydLink {

    routeLinkService(path: string, id?: string) : void
}

export const API_ROUTER: InjectionToken<AdydLink> = new InjectionToken('API_ROUTER');
