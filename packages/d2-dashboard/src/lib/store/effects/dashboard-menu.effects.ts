import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ErrorMessage } from '@iapps/ngx-dhis2-http-client';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
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

  saveDashboardMenus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardMenuActions.saveDashboardMenus),
      switchMap(({ dashboardMenus }) => {
        const splitedUrl = (window.location.href || '').split('/');
        const selectedDashboardMenu =
          dashboardMenus.find(
            (dashboardMenuItem) =>
              dashboardMenuItem.id ===
              splitedUrl[splitedUrl.indexOf('dashboard') + 1]
          ) || dashboardMenus[0];

        return [
          DashboardMenuActions.setCurrentDashboardMenu({
            selectedDashboardMenu,
          }),
        ];
      })
    )
  );

  setCurrrenDashboardMenu$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardMenuActions.setCurrentDashboardMenu),
        tap(({ selectedDashboardMenu }) => {
          const config: DashboardConfig =
            this.dashboardConfigService.getConfig();
          this._snackBarRef = this._snackBar.open(
            `Loading ${selectedDashboardMenu.name} Dashboard`,
            '',
            { duration: 5000 }
          );
          this.router.navigate([config.rootUrl, selectedDashboardMenu.id]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private dashboarMenuService: DashboardMenuService,
    private dashboardConfigService: DashboardConfigService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarRef: MatSnackBarRef<TextOnlySnackBar>
  ) {}

  ngrxOnInitEffects(): Action {
    return DashboardMenuActions.loadDashboardMenus();
  }
}
