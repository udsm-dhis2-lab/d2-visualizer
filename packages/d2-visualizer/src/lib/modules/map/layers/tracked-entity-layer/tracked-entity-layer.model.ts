import { BaseVisualizer } from '../../../../shared/base-visualizer';
declare let mapboxgl: any;
import { flatten } from 'lodash';
import {
  SelectionFilterUtil,
  TrackedEntityFilterUtil,
} from '../../../../shared/utilities';

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
        center: this._config?.mapCenter,
        zoom: this._config?.zoom || 5,
      });
      this.map.addControl(new mapboxgl.NavigationControl());

      const geojson = this.getGeoJSON();

      (geojson.features || []).forEach((marker: any) => {
        const markerEl = document.createElement('div');
        markerEl.style.backgroundImage = `url(${marker?.properties?.symbol})`;
        markerEl.style.width = '18px';
        markerEl.style.height = '18px';
        markerEl.style.backgroundSize = '100%';

        const markerElement = new mapboxgl.Marker(markerEl)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup().setHTML(this.getPopupContent(marker)))
          .addTo(this.map);

        const markerDiv = markerElement.getElement();

        markerDiv.addEventListener('mouseenter', () =>
          markerElement.togglePopup()
        );
        markerDiv.addEventListener('mouseleave', () =>
          markerElement.togglePopup()
        );
      });
    } catch (e) {
      console.warn('There ', e);
    }
  }

  getPopupContent(marker: any) {
    let htmlContent = this._config?.popUpTemplate || '';

    // TODO: Find best way to handle custom templates
    htmlContent = htmlContent.replace(
      new RegExp('A<' + marker?.properties?.dimensionItem + '>', 'g'),
      marker?.properties?.value
    );

    return htmlContent;
  }

  getGeoJSON() {
    const customFilter = SelectionFilterUtil.getCustomFilter(
      this._dataSelections
    );

    return {
      type: 'FeatureCollection',
      features: flatten(
        (customFilter
          ? TrackedEntityFilterUtil.filterTrackedEntityInstancesByExpression(
              this._trackedEntityInstances || [],
              customFilter
            )
          : this._trackedEntityInstances || []
        ).map((trackedEntityInstance) => {
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
                  orgUnitName: orgUnitName,
                  symbol:
                    markerSymbol?.symbol || './assets/images/marker-dot.svg',
                  value: attributeValue?.value,
                  dimensionItem: attributeValue.attribute,
                  dimensionType: 'ATTRIBUTE',
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
