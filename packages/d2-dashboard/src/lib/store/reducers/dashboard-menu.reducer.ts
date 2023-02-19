import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { DashboardMenuObject } from '../../models';
import { DashboardMenuActions } from '../actions';

export interface D2DashboardMenuState extends EntityState<DashboardMenuObject> {
  loading: boolean;
  loaded: boolean;
  loadingError: any | null;
  selectedDashboardMenuId: string | null;
}

export const d2DashboardMenuAdapter: EntityAdapter<DashboardMenuObject> =
  createEntityAdapter<DashboardMenuObject>({});

const initialState: D2DashboardMenuState =
  d2DashboardMenuAdapter.getInitialState({
    loading: false,
    loaded: false,
    loadingError: null,
    selectedDashboardMenuId: null,
  });

export const d2DashboardMenuFeature = createFeature({
  name: 'dashboardMenus',
  reducer: createReducer(
    initialState,
    on(DashboardMenuActions.loadDashboardMenus, (state) => ({
      ...state,
      loading: false,
      loaded: false,
      loadingError: null,
    })),
    on(DashboardMenuActions.saveDashboardMenus, (state, { dashboardMenus }) =>
      d2DashboardMenuAdapter.setMany(dashboardMenus, {
        ...state,
        loaded: true,
        loading: false,
      })
    ),
    on(
      DashboardMenuActions.loadDashboardMenusFailed,
      (state, { loadingError }) => ({ ...state, loadingError, loading: false })
    )
  ),
});
