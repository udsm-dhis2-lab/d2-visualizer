import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { find } from 'lodash';
import {
  BehaviorSubject,
  firstValueFrom,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { catchError, distinctUntilChanged, map, take } from 'rxjs/operators';
import { DashboardLoaderComponent } from '../components/dashboard-loader/dashboard-loader.component';
import {
  Dashboard,
  DashboardMenu,
  DashboardMenuObject,
  DashboardObject,
} from '../models';

interface DashboardStore {
  currentDashboardMenu?: DashboardMenuObject;
}

@Injectable()
export class DashboardService {
  private _dashboardStore$: BehaviorSubject<DashboardStore>;
  private _dashboardStoreObservable$: Observable<DashboardStore>;
  private _overlayRef?: OverlayRef;

  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _snackBarRef: MatSnackBarRef<TextOnlySnackBar>,
    private overlay: Overlay
  ) {
    this._dashboardStore$ = new BehaviorSubject({});

    this._dashboardStoreObservable$ = this._dashboardStore$.asObservable();
  }

  getMenuList(config?: any): Observable<DashboardMenuObject[]> {
    this._attachOverlay();
    return this._findMenuList(config).pipe(
      tap((dashboardMenuItems: DashboardMenuObject[]) => {
        const splitedUrl = (window.location.href || '').split('/');
        const currentDashboard =
          find(dashboardMenuItems, [
            'id',
            splitedUrl[splitedUrl.indexOf('dashboard') + 1],
          ]) || dashboardMenuItems[0];

        this.setCurrentDashboard(currentDashboard);
      })
    );
  }

  getCurrentDashboard(id: string, config?: any): Observable<DashboardObject> {
    this._detachOverlay();
    this._attachOverlay();
    return (
      config?.useDataStore
        ? this._findByIdFromDataStore(id)
        : this._findByIdFromApi(id, config)
    ).pipe(
      tap(() => {
        this._detachOverlay();
        this._snackBarRef.dismiss();
      }),
      catchError((error) => {
        console.log('WE HAVE ERROR SITUATION HERE');
        return throwError(error);
      })
    );
  }

  async setCurrentDashboard(currentDashboardMenu: DashboardMenuObject) {
    this._snackBarRef = this._snackBar.open(
      `Loading ${currentDashboardMenu.name} Dashboard`
    );

    const dashboardStore = await firstValueFrom(
      this._dashboardStoreObservable$.pipe(take(1))
    );
    this._dashboardStore$.next({ ...dashboardStore, currentDashboardMenu });
    this.router.navigate(['/dashboard/' + currentDashboardMenu.id]);
  }

  getCurrentDashboardId(): Observable<string | undefined> {
    return this._dashboardStoreObservable$.pipe(
      distinctUntilChanged(),
      map((dashboardStore) => dashboardStore?.currentDashboardMenu?.id)
    );
  }

  private _findMenuList(config: any): Observable<DashboardMenuObject[]> {
    return (
      config?.useDataStore
        ? this._findAllFromDataStore()
        : this._findAllFromApi()
    ).pipe(
      map((res) =>
        (res?.dashboards || []).map(
          (dashboard: { [key: string]: string | number | object }) =>
            new DashboardMenu(dashboard).toObject()
        )
      )
    );
  }

  private _findAllFromApi() {
    return this.httpClient.get('dashboards.json?fields=id,name&paging=false');
  }

  private _findAllFromDataStore() {
    return of({ dashboards: [] });
  }

  private _findByIdFromApi(id: string, preference?: any) {
    return this.httpClient
      .get(
        `dashboards/${id}.json?fields=id,name,description,favorite,dashboardItems[id,type,x,y,height,width,shape,visualization[id],chart~rename(visualization)]`
      )
      .pipe(
        map((dashboardResponse) => new Dashboard(dashboardResponse).toObject())
      );
  }

  private _findByIdFromDataStore(id: string, preference?: any) {
    return this.httpClient.get(
      `dashboards/${id}.json?fields=id,name,description,favorite,dashboardItems[id,type,shape,visualization[id],chart~rename(visualization)]`
    );
  }

  private _attachOverlay() {
    this._overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
    });
    this._overlayRef.attach(new ComponentPortal(DashboardLoaderComponent));
  }

  private _detachOverlay() {
    this._overlayRef?.detach();
  }
}
