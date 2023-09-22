import { format } from 'date-fns';
import { flatten } from 'lodash';
import { BaseVisualizer } from '../../../shared/models/base-visualizer.model';
import {
  SelectionFilterUtil,
  TrackedEntityFilterUtil,
} from '../../../shared/utilities';
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
    // let htmlContent = this._config?.popUpTemplate || '';
    const htmlContent = `<div>
      <h6>${this._program.name || 'Report details'}</h6>
      ${(marker?.properties?.reportAttributes || [])
        .map(
          (reportAttribute: { label: any; value: any }) =>
            `<div><span style="color: gray">${reportAttribute.label}</span>:&nbsp;${reportAttribute.value}</div>`
        )
        .join('')}
        <div style="border-bottom: 1px rgba(0,0,0,0.1) solid; margin-top: 8px; margin-bottom: 8px"></div>
       ${(marker?.properties.attributes || [])
         .map(
           (
             attribute: any
           ) => ` <div style="display: flex; justify-content: space-between">
       <div style="color: gray">${attribute.label}</div>
       <div>${attribute.value}</div>
     </div>`
         )
         .join('')}
    </div>`;
    // TODO: Find best way to handle custom templates
    // htmlContent = htmlContent.replace(
    //   new RegExp('A<' + marker?.properties?.dimensionItem + '>', 'g'),
    //   marker?.properties?.value
    // );

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
              const { geometry, orgUnitName, enrollmentDate, incidentDate } =
                enrollment;

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

              const reportAttributes = [
                {
                  value: orgUnitName,
                  label: 'Reporting unit',
                },
                {
                  value: format(new Date(enrollmentDate), 'MMM dd, yyyy'),
                  label: this._program.enrollmentDateLabel || 'Enrollment date',
                },
                {
                  value: format(new Date(incidentDate), 'MMM dd, yyyy'),
                  label: this._program.enrollmentDateLabel || 'Incident date',
                },
              ];

              const attributes = (trackedEntityInstance.attributes || [])
                .map((attribute: any, index: number) => {
                  const programTrackedEntityAttribute = (
                    this._program.programTrackedEntityAttributes || []
                  ).find(
                    (programTrackedEntityAttribute: any) =>
                      programTrackedEntityAttribute.trackedEntityAttribute
                        ?.id === attribute.attribute
                  );

                  if (!programTrackedEntityAttribute) {
                    return null;
                  }

                  const codedValue =
                    programTrackedEntityAttribute?.trackedEntityAttribute.optionSet?.options?.find(
                      (option: { code: any }) => option.code === attribute.value
                    );

                  return {
                    label:
                      programTrackedEntityAttribute?.trackedEntityAttribute
                        ?.formName ||
                      programTrackedEntityAttribute?.trackedEntityAttribute
                        ?.name,
                    value: codedValue?.name || attribute.value,
                    sortOrder:
                      programTrackedEntityAttribute?.sortOrder || index,
                    displayInList: programTrackedEntityAttribute?.displayInList,
                  };
                })
                .filter((attribute: any) => attribute?.displayInList)
                .sort(
                  (a: { sortOrder: number }, b: { sortOrder: number }) =>
                    a.sortOrder - b.sortOrder
                );

              return {
                type: 'Feature',
                geometry,
                properties: {
                  title: orgUnitName,
                  orgUnitName: orgUnitName,
                  reportAttributes,
                  attributes,
                  symbol:
                    markerSymbol?.symbol || './assets/images/marker-dot.svg',
                  value: attributeValue?.value,
                  dimensionItem: attributeValue?.attribute,
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
