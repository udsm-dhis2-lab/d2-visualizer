import { VisualizationData } from '../../../shared/models';
import {
  DigitGroupSeparator,
  LegendSet,
  MapLayerType,
  MapRenderingStrategy,
  TitleOption,
} from '../models';
import { GeoFeature } from '../models/geo-feature.model';

export class MapLayer {
  id!: string;
  name!: string;
  program!: string;
  layer!: MapLayerType;
  renderingStrategy!: MapRenderingStrategy;
  sortOrder!: number;
  eventClustering!: boolean;
  opacity!: number;
  eventPointRadius!: number;
  hideSubtitle!: boolean;
  digitGroupSeparator!: DigitGroupSeparator;
  titleOption!: TitleOption;
  subtitleOption!: TitleOption;
  legendSet!: LegendSet;
  dataSelections!: any[];
  geoFeatures!: GeoFeature[];
  data!: any;

  setId(id: string) {
    this.id = id;
    return this;
  }

  setProgram(program: string) {
    this.program = program;
    return this;
  }

  setTitleOption(titleOption: TitleOption) {
    this.titleOption = titleOption;
    return this;
  }

  setSubTitleOption(subtitleOption: TitleOption) {
    this.subtitleOption = subtitleOption;
    return this;
  }

  setType(type: MapLayerType) {
    this.layer = type;
    return this;
  }

  setRenderingStrategy(renderingStrategy: MapRenderingStrategy) {
    this.renderingStrategy = renderingStrategy;
    return this;
  }

  setSortOrder(sortOrder: number) {
    this.sortOrder = sortOrder;
    return this;
  }

  setEventClustering(eventClustering: boolean) {
    this.eventClustering = eventClustering;
    return this;
  }

  setOpacity(opacity: number) {
    this.opacity = opacity;
    return this;
  }

  setEventPointRadius(eventPointRadius: number) {
    this.eventPointRadius = eventPointRadius;
    return this;
  }

  setLegendSet(legendSet: LegendSet) {
    this.legendSet = legendSet;
    return this;
  }

  setDataSelections(dataSelections: any): any {
    this.dataSelections = dataSelections;
    return this;
  }

  async getGeoFeatures() {
    this.geoFeatures = await new GeoFeature()
      .setDataSelections(this.dataSelections)
      .get();
  }

  async getData() {
    this.data = (
      await new VisualizationData()
        .setSelections(this.dataSelections)
        .getAnalytics()
    )?._data;
  }
}
