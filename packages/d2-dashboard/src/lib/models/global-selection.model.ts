import { VisualizationDataSelection } from './visualization-data-selection.model';

export interface GlobalSelection {
  default: boolean;
  summary?: string;
  dataSelections: VisualizationDataSelection[];
}
