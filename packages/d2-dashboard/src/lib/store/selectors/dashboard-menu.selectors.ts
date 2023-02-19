import { createFeatureSelector } from '@ngrx/store';
import {
  d2DashboardMenuAdapter,
  d2DashboardMenuFeature,
  D2DashboardMenuState,
} from '../reducers';

export const selectDashboardMenuState =
  createFeatureSelector<D2DashboardMenuState>('dashboardMenus');

export const {
  selectLoading: getDashboardMenuLoadingStatus,
  selectLoaded: getDashboardMenuLoadedStatus,
  selectLoadingError: getDashboardMenuLoadingStatusErrorMessage,
  selectSelectedDashboardMenuId: getSelectedDashboardMenuId,
} = d2DashboardMenuFeature;

export const {
  selectIds: getDashboardMenuIds,
  selectEntities: getDashboardMenuEntities,
  selectAll: getAllDashboardMenus,
  selectTotal: getTotalDashboardMenus,
} = d2DashboardMenuAdapter.getSelectors(selectDashboardMenuState);
