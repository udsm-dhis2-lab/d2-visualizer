import { DownloadFormat } from '../../shared/download-format';
import { VisualizationConfiguration } from '../../shared/visualization-configuration';
import { VisualizationLayout } from '../../shared/visualization-layout';
import { MapFeatures } from './interfaces/map.interface';
import { Fn } from '@iapps/function-analytics';
declare let mapboxgl: any;
declare let turf: any;

export class D2MapVisualizer {
    private _data: any;
  private _config!: VisualizationConfiguration;
  private _id!: string;
  private _layout!: VisualizationLayout;
  private _chart: any;


    setId(id: string) {
        this._id = id;
        return this;
      }
    
      // setType(type: ChartType) {
      //   this._type = type;
      //   return this;
      // }
    
      setData(data: any) {
        this._data = data;
        return this;
      }
    
      setConfig(config: VisualizationConfiguration) {
        this._config = config;
        return this;
      }
    
      draw() {
        try {
          var getFeatures = new Fn.IdentifiableObject('geoFeatures');
        } catch (e) {}
    
        try {
          let style =
            'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=CH1cYDfxBV9ZBu1lHGqh';
          //declare let mapboxgl: any;
          mapboxgl.accessToken =
            'pk.eyJ1IjoiaWJyYWhpbXdpY2thbWEiLCJhIjoiY2txM3Y2bXJ1MTJoZjJ2cXI1ZW9pdGg2biJ9.RZjlqK5FxQkQuFrh5lZm_g';
          let map = new mapboxgl.Map({
            container: this._id,
            style: style,
            center: [this._config.longitude, this._config.latitude],
            zoom: this._config.zoom,
          });
          // Add zoom and rotation controls to the map.
          map.addControl(new mapboxgl.NavigationControl());
          //this.map = map;
          map.on('load', () => {
            // Add a data source containing GeoJSON data.
            const mapSourcename = 'map_source';
    
            const mapFeatures: MapFeatures = {
              id: '',
              type: '',
              geometry: { type: '', coordinates: [] },
              properties: { datavalue: '', popupContents: '' },
            };
            map.addSource(mapSourcename, {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: mapFeatures,
              },
            });
    
            // Add a new layer to visualize the polygon.
            const innerLayer = `${mapSourcename}_layer_${1}`;
            const fillColor = this._config?.fillColor || '#b2acfa';
            const maxValueRange: number = 1000;
            map.addLayer({
              id: innerLayer,
              type: 'fill',
              source: mapSourcename, // reference the data source
              layout: {},
              paint: {
                'fill-color': {
                  property: 'datavalue',
                  stops: [
                    [0, '#fff'],
                    [Math.abs(maxValueRange), fillColor],
                  ],
                },
                'fill-opacity': [
                  'case',
                  ['boolean', ['feature-state', 'hover'], false],
                  1,
                  0.5,
                ],
              },
            });
    
            // feature state for the feature under the mouse.
            map.on('click', innerLayer, (e: any) => {
              new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(e.features[0].properties.popupContents)
                .addTo(map);
            });
    
            // this.visualizationEntity.data.forEach((mapData, index: number) => {
            (this._data || []).forEach((mapData: any, index: number) => {
              let hoveredStateId: any = null;
    
              // Add a black outline around the polygon.
              map.addLayer({
                id: `${mapSourcename}_outline_${index}`,
                type: 'line',
                source: mapSourcename,
                layout: {},
                paint: {
                  'line-color': '#000',
                  'line-width': 1,
                },
              });
    
              // When the user moves their mouse over the state-fill layer, we'll update th
              // feature state for the feature under the mouse.
              map.on('mousemove', innerLayer, (e: any) => {
                if (e.features.length > 0) {
                  if (hoveredStateId !== null) {
                    try {
                      map.setFeatureState(
                        { source: mapSourcename, id: hoveredStateId },
                        { hover: false }
                      );
                    } catch (e) {}
                  }
                  hoveredStateId = e.features[0].id;
                  try {
                    map.setFeatureState(
                      { source: mapSourcename, id: hoveredStateId },
                      { hover: true }
                    );
                  } catch (e) {}
                }
              });
    
              // When the mouse leaves the state-fill layer, update the feature state of the
              // previously hovered feature.
              map.on('mouseleave', innerLayer, () => {
                if (hoveredStateId !== null) {
                  try {
                    map.setFeatureState(
                      { source: mapSourcename, id: hoveredStateId },
                      { hover: false }
                    );
                  } catch (e) {}
                }
                hoveredStateId = null;
              });
            });
    
            // jump to map bounds
            const geojson = {
              type: 'FeatureCollection',
              features: mapFeatures,
            };
            let bbox = turf.extent(geojson);
            map.fitBounds(bbox, { padding: 20 });
          });
        } catch (e) {
          console.log(e);
        }
      }
    
      download(downloadFormat: DownloadFormat) {
        const filename = this._config?.name || 'chart-data';
        switch (downloadFormat) {
          case 'PNG':
            this._chart.exportChart({ filename, type: 'image/png' });
            break;
          case 'CSV':
            this._chart.getCSV();
            break;
        }
      }
}
