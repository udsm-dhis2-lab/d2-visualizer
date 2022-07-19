import { BaseVisualizer } from '../../../../shared/base-visualizer';
declare let mapboxgl: any;

export class TrackedEntityLayer extends BaseVisualizer {
  private map: any;
  style =
    'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';
  source: any;
  accessToken =
    'pk.eyJ1IjoiaWJyYWhpbXdpY2thbWEiLCJhIjoiY2txM3Y2bXJ1MTJoZjJ2cXI1ZW9pdGg2biJ9.RZjlqK5FxQkQuFrh5lZm_g';

  constructor() {
    super();
    mapboxgl.accessToken = this.accessToken;
  }

  buildInitialMap() {
    try {
      this.map = new mapboxgl.Map({
        container: this._id,
        style: this.style,
        // center: this.getCenterCoordinates(),
        center: [34.8888, -5.66901],
        zoom: 5,
      });

      // Add zoom and rotation controls to the map.
      this.map.addControl(new mapboxgl.NavigationControl());

      /// Add data on map load
      this.map.on('load', (event: any) => {
        /// register source
        // const markersPins = convertMapPinsToMarkers(this.mapPins);
        this.map.addSource(this._id, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [],
          },
        });
        /// get source
        this.source = this.map.getSource(this._data);
        /// create map layers
        this.map.addLayer({
          id: this._id,
          source: this._id,
          type: 'symbol',
          layout: {
            'text-size': 24,
            'text-transform': 'uppercase',
            'text-offset': [0, 1.5],
          },
          paint: {
            'text-color': '#f16624',
            'text-halo-color': '#fff',
            'text-halo-width': 2,
          },
        });
      });
    } catch (e) {
      console.warn('There ', e);
    }
  }

  draw(): void {
    this.buildInitialMap();
  }
}
