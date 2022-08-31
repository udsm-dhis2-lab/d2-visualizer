import {
  BaseVisualizer,
  Visualizer,
} from '../../shared/models/base-visualizer.model';
import { MapLayer } from './layers/map-layer.model';
import { BaseMap } from './models';

export class MapVisualizer extends BaseVisualizer implements Visualizer {
  basemap!: BaseMap;
  layers: MapLayer[] = [];

  setBaseMap(basemap: BaseMap): MapVisualizer {
    this.basemap = basemap;
    return this;
  }

  addLayer(layer: MapLayer): MapVisualizer {
    this.layers = [...this.layers, layer];
    return this;
  }

  draw(): void {
    this.layers.map(async (layer: MapLayer) => {
      await layer.getGeoFeatures();
      await layer.getData();

      console.log(layer);
    });
    // new MapUtil()
    //   .setMapAnalytics(data as MapAnalytics)
    //   .setGeofeature(this.geoFeatures as any)
    //   .setLegendSet(this.legendSets)
    //   .setMapDashboardItem(this.config.config)
    //   .setMapDashboardExtensionItem(this.mapDashboardExtensionItem)
    //   .setContainer(this._id)
    //   .setStyle(this.layerStyle)
    //   .setShowLegend(this.d2VisualizerMapControl?.showMapLegend)
    //   .setShowLabel(this.d2VisualizerMapControl?.showMapLabel)
    //   .setShowValue(this.d2VisualizerMapControl?.showMapValue)
    //   .setShowMapTitle(this.d2VisualizerMapControl?.showMapTitle)
    //   .setShowBoundary(this.d2VisualizerMapControl?.showMapBoundary)
    //   .setShowMapSummary(this.d2VisualizerMapControl?.showMapSummary)
    //   .draw();
  }
}
