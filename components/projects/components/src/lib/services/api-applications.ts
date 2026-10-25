import {InjectionToken} from '@angular/core';
import {ApiApplicationsEnum} from "./enum/enum-api-aplications";

interface ApiApplications {

    executeService(api: ApiApplicationsEnum, data: Record<string, unknown>) : any
}

export const API_APPLICATIONS: InjectionToken<ApiApplications> = new InjectionToken('API_APPLICATIONS');

