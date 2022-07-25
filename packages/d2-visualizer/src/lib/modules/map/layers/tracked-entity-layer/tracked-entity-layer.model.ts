import { BaseVisualizer } from '../../../../shared/base-visualizer';
declare let mapboxgl: any;
import { flatten } from 'lodash';

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
        center: [34.8888, -5.66901],
        zoom: 5.4,
      });
      this.map.addControl(new mapboxgl.NavigationControl());

      const geojson = this.getGeoJSON();

      (geojson.features || []).forEach((marker: any) => {
        const markerEl = document.createElement('div');
        markerEl.style.backgroundImage = 'url(./assets/images/marker-dot.svg)';
        markerEl.style.width = '32px';
        markerEl.style.height = '32px';
        markerEl.style.backgroundSize = '100%';

        new mapboxgl.Marker(markerEl)
          .setLngLat(marker.geometry.coordinates)
          .addTo(this.map);
      });
    } catch (e) {
      console.warn('There ', e);
    }
  }

  getGeoJSON() {
    return {
      type: 'FeatureCollection',
      features: flatten(
        this._trackedEntityInstances?.map((trackedEntityInstance) => {
          return flatten(
            (trackedEntityInstance.enrollments || []).map((enrollment: any) => {
              const { geometry, orgUnitName } = enrollment;

              if (!geometry) {
                return [];
              }

              return {
                type: 'Feature',
                geometry,
                properties: {
                  title: orgUnitName,
                  description: orgUnitName,
                },
              };
            })
          );
        })
      ),
    };
  }

  draw(): void {
    console.log(this._trackedEntityInstances);
    this.buildInitialMap();
  }
}
