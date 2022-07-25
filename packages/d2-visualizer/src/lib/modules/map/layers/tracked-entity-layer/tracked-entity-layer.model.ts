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
        markerEl.style.backgroundImage = `url(${marker?.properties?.symbol})`;
        markerEl.style.width = '30px';
        markerEl.style.height = '30px';
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

              const symbols = this._config?.symbols;
              const attributeValue =
                symbols?.dimensionType === 'ATTRIBUTE'
                  ? trackedEntityInstance.attributes.find(
                      (attribute: any) =>
                        attribute.attribute === symbols.dimensionItem
                    )
                  : null;

              const markerSymbol = (symbols?.symbols || []).find(
                (symbol: any) => symbol.value === attributeValue?.value
              );

              return {
                type: 'Feature',
                geometry,
                properties: {
                  title: orgUnitName,
                  description: orgUnitName,
                  symbol:
                    markerSymbol?.symbol || './assets/images/marker-dot.svg',
                },
              };
            })
          );
        })
      ),
    };
  }

  draw(): void {
    this.buildInitialMap();
  }
}
