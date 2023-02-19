import { createFeature, createReducer } from '@ngrx/store';

interface D2DashboardSelectionState {
  dashboardSelections: any;
  loading: boolean;
}

const initialState: D2DashboardSelectionState = {
  dashboardSelections: {},
  loading: false,
};

export const d2DashboardSelectionFeature = createFeature({
  name: 'dashboardSelections',
  reducer: createReducer(initialState),
});

export const { selectDashboardSelectionsState, selectDashboardSelections } =
  d2DashboardSelectionFeature;
