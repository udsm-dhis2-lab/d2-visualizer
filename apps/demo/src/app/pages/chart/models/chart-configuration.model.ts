import { MultiAxisType } from './multi-axis-type.model';

export interface ChartConfiguration {
  renderId: string;
  type: string;
  title: string;
  subtitle: string;
  hideTitle: boolean;
  hideSubtitle: boolean;
  showData: boolean;
  hideEmptyRows: boolean;
  hideLegend: boolean;
  cumulativeValues: boolean;
  targetLineLabel: string;
  baseLineLabel: string;
  legendAlign: string;
  reverseLegend: boolean;
  showLabels: boolean;
  axes: any[];
  sortOrder: number;
  percentStackedValues: boolean;
  multiAxisTypes: MultiAxisType[];
  xAxisType: string[];
  yAxisType: string;
  zAxisType: string[];
  touched: boolean;
}
