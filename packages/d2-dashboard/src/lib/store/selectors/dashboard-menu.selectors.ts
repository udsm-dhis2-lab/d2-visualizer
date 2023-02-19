import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardMenuObject } from '../../models';
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

export const getSelectedDashboardMenu = createSelector(
  getSelectedDashboardMenuId,
  getDashboardMenuEntities,
  (id, entities) => (entities ? entities[id as string] : undefined)
);
