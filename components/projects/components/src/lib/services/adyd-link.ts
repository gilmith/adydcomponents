import {InjectionToken} from "@angular/core";

export interface NavigablePayLoad<T = unknown> {
    type: 'campaign' | 'character';
    id: number | string;
    data: T
}


export interface AdydLink {

    routeLinkService<T>(path: string, payload?: NavigablePayLoad<T>) : void
}

export const API_ROUTER: InjectionToken<AdydLink> = new InjectionToken('API_ROUTER');
