import { Injectable } from '@angular/core';
import { ErrorMessage } from '@iapps/ngx-dhis2-http-client';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';
import { DashboardConfig } from '../../models';
import { DashboardConfigService, DashboardMenuService } from '../../services';
import { DashboardMenuActions } from '../actions';

@Injectable()
export class DashboardMenuEffects implements OnInitEffects {
  loadDashboardMenus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardMenuActions.loadDashboardMenus),
      switchMap(() => {
        const config: DashboardConfig = this.dashboardConfigService.getConfig();
        return this.dashboarMenuService.findMenuList(config).pipe(
          map((dashboardMenus) =>
            DashboardMenuActions.saveDashboardMenus({ dashboardMenus })
          ),
          catchError((loadingError: ErrorMessage) =>
            of(DashboardMenuActions.loadDashboardMenusFailed({ loadingError }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dashboarMenuService: DashboardMenuService,
    private dashboardConfigService: DashboardConfigService
  ) {}

  ngrxOnInitEffects(): Action {
    return DashboardMenuActions.loadDashboardMenus();
  }
}
