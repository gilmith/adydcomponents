import {InjectionToken} from '@angular/core';
import {ApiApplicationsEnum} from "./enum/enum-api-aplications";
import {Observable} from "rxjs";

interface ApiApplications {

    executeService(api: ApiApplicationsEnum, data: Record<string, string|number|File>, operationId: string) : Observable<any>
}

export const API_APPLICATIONS: InjectionToken<ApiApplications> = new InjectionToken('API_APPLICATIONS');

