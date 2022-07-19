import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Period } from '@iapps/period-utilities';
import { firstValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { DashboardObject, VisualizationDataSelection } from '../models';
import { DashboardConfigService } from './dashboard-config.service';
import * as moment from 'moment';

@Injectable()
export class TrackerDashboardService {
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private dashboardConfigService: DashboardConfigService
  ) {}

  getTrackedEntityInstances(
    dashboard: DashboardObject,
    dataSelections?: VisualizationDataSelection[]
  ): Observable<any> {
    const period = this._getPeriod(
      dashboard.periodType as string,
      dataSelections
    );

    return this._getOrgUnit(dataSelections).pipe(
      switchMap((orgUnit) =>
        this.httpClient
          .get(
            `trackedEntityInstances.json?fields=attributes[attribute,value],enrollments[enrollment,orgUnit,orgUnitName,geometry]&ou=${
              orgUnit.id
            }&ouMode=DESCENDANTS&&order=created:desc&program=${
              dashboard.program
            }&skipPaging=true&programStartDate=${
              period.startDate || period.startdate
            }&programEndDate=${period.endDate || period.enddate}`
          )
          .pipe(map((res) => res?.trackedEntityInstances || []))
      )
    );
  }

  private _getPeriod(
    periodType: string,
    dataSelections?: VisualizationDataSelection[]
  ) {
    const periodSelection: any = (dataSelections?.find(
      ({ dimension }) => dimension === 'pe'
    )?.items || [])[0];

    if (periodSelection) {
      const splitedStartDate = (periodSelection.startDate || '').split('-');

      const startDate =
        splitedStartDate[0].length < 4
          ? splitedStartDate.reverse().join('-')
          : periodSelection.startDate;

      const splitedEndDate = (periodSelection.endDate || '').split('-');

      const endDate =
        splitedEndDate[0].length < 4
          ? splitedEndDate.reverse().join('-')
          : periodSelection.endDate;

      return {
        ...periodSelection,
        startDate,
        endDate,
      };
    }

    const date = new Date().toISOString();
    const period: any = (new Period()
      .setType(periodType)
      .setPreferences({ allowFuturePeriods: true })
      .get()
      .list() || [])[0] || {
      startDate: date,
      endDate: date,
    };

    return period;
  }

  private _getOrgUnit(
    dataSelections?: VisualizationDataSelection[]
  ): Observable<any> {
    const orgUnitSelection: any = (dataSelections?.find(
      ({ dimension }) => dimension === 'ou'
    )?.items || [])[0];

    return orgUnitSelection
      ? of(orgUnitSelection)
      : this.httpClient.me().pipe(map((me) => me.organisationUnits[0]));
  }
}
