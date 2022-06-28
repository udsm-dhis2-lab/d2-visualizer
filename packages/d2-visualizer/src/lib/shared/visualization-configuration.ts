import { getSelectionDimensionsFromFavorite } from './helpers';
import { VisualizationDataSelection } from './visualization-data-selection';
import { VisualizationLayout } from './visualization-layout';
import { VisualizationType } from './visualization-type';

export class VisualizationConfiguration {
  dataSelections: VisualizationDataSelection[];
  layout?: VisualizationLayout;
  constructor(public config: any) {
    this.dataSelections = getSelectionDimensionsFromFavorite(this.config);
    this.layout = VisualizationLayout.getLayout(this.dataSelections);
  }

  get renderId(): string {
    return this.config?.id;
  }
  get name(): string {
    return this.config?.displayName;
  }

  get type(): VisualizationType {
    return this.config?.type.toLowerCase();
  }

  get hideEmptyColumns(): boolean {
    return this.config?.hideEmptyColumns;
  }

  get rowSubTotals(): boolean {
    return this.config?.rowSubTotals;
  }

  get cumulativeValues(): boolean {
    return this.config?.cumulativeValues;
  }

  get showDimensionLabels(): boolean {
    return this.config?.showDimensionLabels;
  }

  get sortOrder(): number {
    return this.config?.sortOrder;
  }

  get fontSize(): string {
    return this.config?.fontSize;
  }

  get topLimit(): number {
    return this.config?.topLimit;
  }

  get percentStackedValues(): boolean {
    return this.config?.percentStackedValues;
  }

  get noSpaceBetweenColumns(): boolean {
    return this.config?.noSpaceBetweenColumns;
  }

  get showHierarchy(): boolean {
    return this.config?.showHierarchy;
  }

  get hideTitle(): boolean {
    return this.config?.hideTitle;
  }

  get colorSet(): string {
    return this.config?.colorSet;
  }

  get skipRounding(): boolean {
    return this.config?.skipRounding;
  }

  get showData(): boolean {
    return this.config?.showData;
  }

  get fixRowHeaders(): boolean {
    return this.config?.fixRowHeaders;
  }

  get numberType(): number {
    return this.config?.numberType;
  }

  get hideEmptyRows(): boolean {
    return this.config?.hideEmptyRows;
  }

  get displayDensity(): boolean {
    return this.config?.displayDensity;
  }

  get regressionType(): boolean {
    return this.config?.regressionType;
  }

  get colTotals(): boolean {
    return this.config?.colTotals;
  }

  get hideEmptyRowItems(): string {
    return this.config?.hideEmptyRowItems;
  }

  get aggregationType(): string {
    return this.config?.aggregationType;
  }

  get hideSubtitle(): boolean {
    return this.config?.hideSubtitle;
  }

  get hideLegend(): boolean {
    return this.config?.hideLegend;
  }

  get fixColumnHeaders(): boolean {
    return this.config?.fixColumnHeaders;
  }

  get colSubTotals(): boolean {
    return this.config?.colSubTotals;
  }

  get rowTotals(): boolean {
    return this.config?.rowTotals;
  }

  get digitGroupSeparator(): boolean {
    return this.config?.digitGroupSeparator;
  }

  get regression(): boolean {
    return this.config?.regression;
  }

  get multiAxisTypes(): string[] {
    return this.config?.selectedChartTypes;
  }

  get axes(): any[] {
    return [];
  }

  get xAxisType(): string[] {
    return this.layout?.rows || ['dx'];
  }

  get yAxisType(): string {
    return this.layout?.columns && this.layout?.columns.length > 0
      ? (this.layout?.columns[0] as string)
      : 'ou';
  }

  get zAxisType(): string[] {
    return this.layout?.filters || ['pe'];
  }

  get zoom(): number {
    return this.config?.zoom;
  }

  get fillColor(): string {
    return this.config?.fillColor;
  }

  get latitude(): string {
    return this.config?.latitude;
  }

  get longitude(): string {
    return this.config?.longitude;
  }

  get height(): string {
    return this.config?.height;
  }

  get width(): string {
    return this.config?.width;
  }

  get mapboxApiKey(): string {
    return this.config?.mapboxApiKey;
  }

  get mapboxStyle(): string {
    return this.config?.mapboxStyle;
  }
}
