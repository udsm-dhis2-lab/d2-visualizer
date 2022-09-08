import {
  BaseVisualizer,
  Visualizer,
} from '../../shared/models/base-visualizer.model';
import { MapLayer } from './layers/map-layer.model';
import { BaseMap } from './models';
import { MapDrawablePayload } from './models/map-drawable-payload.model';
import { D2MapEngine } from './utils/map-engine.util';
declare let mapboxgl: any;
import * as turf from '@turf/turf';

export class MapVisualizer extends BaseVisualizer implements Visualizer {
  basemap!: BaseMap;
  layers: MapLayer[] = [];

  style =
    'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';
  source: any;
  accessToken =
    'pk.eyJ1IjoiaWJyYWhpbXdpY2thbWEiLCJhIjoiY2txM3Y2bXJ1MTJoZjJ2cXI1ZW9pdGg2biJ9.RZjlqK5FxQkQuFrh5lZm_g';

  constructor() {
    super();
    mapboxgl.accessToken = this.accessToken;
  }

  setBaseMap(basemap: BaseMap): MapVisualizer {
    this.basemap = basemap;
    return this;
  }

  addLayer(layer: MapLayer): MapVisualizer {
    this.layers = [...this.layers, layer];
    return this;
  }

  draw(): void {
    const map = new mapboxgl.Map({
      container: this._id,
      style: this.style,
      center: [0, 0],
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', () => {
      this.layers.map(async (layer: MapLayer) => {
        await layer.getGeoFeatures();
        await layer.getData();
        // console.log(layer);

        const mapSourceData = {
          type: 'FeatureCollection',
          features: layer.geoFeatures.map((geoFeature) => {
            return {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: JSON.parse(geoFeature.co),
              },
            };
          }),
        };

        const bbox = turf.bbox(mapSourceData);
        map.fitBounds(bbox, { padding: 20 });

        map.addSource(layer.id, {
          type: 'geojson',
          data: mapSourceData,
        });

        map.addLayer({
          id: layer.id,
          type: 'line',
          source: layer.id,
        });
      });
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