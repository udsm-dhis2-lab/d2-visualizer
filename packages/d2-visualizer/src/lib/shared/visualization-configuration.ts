import { VisualizationType } from './visualization-type';

export class VisualizationConfiguration {
  constructor(public config: any) {}

  get renderId(): string {
    return this.config?.id;
  }
  get name(): string {
    return this.config?.displayName;
  }

  get type(): VisualizationType {
    return this.config?.type;
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

  get xAxisType(): string[] {
    return this.config?.rowDimensions;
  }

  get yAxisType(): string[] {
    return this.config?.columnDimensions;
  }

  get zAxisType(): string[] {
    return this.config?.filterDimensions;
  }
}
