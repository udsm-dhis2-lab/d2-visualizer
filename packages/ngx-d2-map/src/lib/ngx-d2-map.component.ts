/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MapAnalytics } from './models/map-analytic.model';
import { LegendSet } from './models/legend-set.model';
import { D2Visualizer } from '@iapps/d2-visualizer';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as _ from 'lodash';
import { D2VisualizerMapControl } from './models/map-control.model';
import { FormControl, FormGroup } from '@angular/forms';
import * as htmlToImage from 'html-to-image';
import { mapLayerConfigs } from './config/map-layer.config';
import { MapLayerConfig } from './models/map-layer-config.model';
import { GeoFeatureSnapshot } from './models/map-geofeature-snapshot.model';
import { MapDashboardItem } from './models/map-dashboard-item.model';
import { MapDashboardExtensionItem } from './models/map-dashboard-extension.model';

@Component({
  selector: 'iapps-ngx-d2-map',
  templateUrl: './ngx-d2-map.component.html',
  styleUrls: ['./ngx-d2-map.component.scss'],
})
export class NgxD2MapComponent implements OnChanges {
  /**
   * @param {string} container
   * @param {MapAnalytics[]} mapAnalytics
   * @param {GeoFeature[]} mapGeoFeature
   * @param {LegendSet} mapLegendSet
   */
  @Input() container: string | undefined;
  @Input() mapAnalytics: MapAnalytics[] | any;
  @Input() mapGeoFeatures: GeoFeatureSnapshot[] | any;
  @Input() mapLegendSets: LegendSet[] | any;
  @Input() mapDashboardItem: MapDashboardItem | any;
  @Input() mapDashboardExtensionItem: MapDashboardExtensionItem | any;

  /**
   * D2VisualizerMapControl
   * @type {D2VisualizerMapControl}
   */
  d2VisualizerMapControl: D2VisualizerMapControl = {
    showMapTitle: true,
    showMapLegend: true,
    showMapLabel: true,
    showMapValue: true,
    showMapBoundary: false,
    showMapSummary: false,
  };

  // Assets
  topLeftImage = 'assets/top-left.png';
  topRightImage = 'assets/top-right.png';
  bottomLeftImage = 'assets/bottom-left.png';
  bottomRightImage = 'assets/bottom-right.png';

  /**
   * Form
   * @type {FormGroup}
   * @memberof NgxD2MapComponent
   */
  d2VisualizerMapControlForm: FormGroup = new FormGroup({
    showMapTitle: new FormControl(false),
    showMapLegend: new FormControl(false),
    showMapLabel: new FormControl(false),
    showMapValue: new FormControl(false),
    showMapBoundary: new FormControl(false),
    showMapSummary: new FormControl(false),
  });

  /**
   * @param mapLayerConfig
   * @returns {MapLayerConfig}
   */
  mapLayerConfigs: MapLayerConfig[] = mapLayerConfigs;

  selectedMapLayerConfig = 'light';

  /**
   * @param {string} type
   */
  constructor() {}

  /**
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    /**
     *
     */
    setTimeout(() => {
      this.d2VisualizerMapControlForm.patchValue(this.d2VisualizerMapControl);
      if (
        this.container &&
        this.mapAnalytics &&
        this.mapGeoFeatures &&
        this.mapLegendSets
      ) {
        /**
         *
         */
        new D2Visualizer()
          .setType('MAP')
          .setChartType('map')
          .setData(this.mapAnalytics)
          .setId(this.container)
          .setGeoFeatures(this.mapGeoFeatures)
          .setLegendSet(this.mapLegendSets)
          .setDashboardItem(this.mapDashboardItem)
          .setDashboardExtensionItem(this.mapDashboardExtensionItem)
          .setD2VisualizerMapControl(this.d2VisualizerMapControl)
          .draw();
      }
    }, 20);
  }

  /**
   *
   * @param matCheckboxChange
   * @param criteria
   */
  clickUp(matCheckboxChange: MatCheckboxChange, criteria: string) {
    this.d2VisualizerMapControl = {
      ...this.d2VisualizerMapControl,
      [_.trim(criteria)]: matCheckboxChange.checked,
    };

    if (
      !this.d2VisualizerMapControlForm.get('showMapLabel')?.value &&
      criteria === 'showMapLabel'
    ) {
      this.d2VisualizerMapControl = {
        ...this.d2VisualizerMapControl,
        showMapValue: false,
      };

      this.d2VisualizerMapControlForm.patchValue({
        ...this.d2VisualizerMapControlForm.value,
        showMapValue: false,
      });
    }

    setTimeout(() => {
      if (
        this.container &&
        this.mapAnalytics &&
        this.mapGeoFeatures &&
        this.mapLegendSets
      ) {
        /**
         *
         */
        new D2Visualizer()
          .setType('MAP')
          .setChartType('map')
          .setData(this.mapAnalytics)
          .setId(this.container)
          .setGeoFeatures(this.mapGeoFeatures)
          .setLegendSet(this.mapLegendSets)
          .setD2VisualizerMapControl(this.d2VisualizerMapControl)
          .draw();
      }
    }, 20);
  }

  /**
   *
   * @param mapLayerConfig
   */
  onLayerChange(mapLayerConfig: MapLayerConfig) {
    setTimeout(() => {
      if (
        this.container &&
        this.mapAnalytics &&
        this.mapGeoFeatures &&
        this.mapLegendSets &&
        mapLayerConfig
      ) {
        /**
         *
         */
        new D2Visualizer()
          .setType('MAP')
          .setLayerStyle(mapLayerConfig?.id)
          .setChartType('map')
          .setData(this.mapAnalytics)
          .setId(this.container)
          .setGeoFeatures(this.mapGeoFeatures)
          .setLegendSet(this.mapLegendSets)
          .setD2VisualizerMapControl(this.d2VisualizerMapControl)
          .draw();
      }
    }, 20);
  }

  /**
   *
   * @param type
   */
  exportMapContent(type: string) {
    if (type === 'png' && this.container) {
      const node: HTMLElement | null = document.getElementById(this.container);
      console.log('DOWNLOAD STARTED...');

      if (node) {
        // htmlToImage
        //   .toJpeg(node), { quality: 0.95 })
        //   .then(function (dataUrl) {
        //     var link = document.createElement('a');
        //     link.download = 'my-image-name.jpeg';
        //     link.href = dataUrl;
        //     link.click();
        //   });

        htmlToImage.toCanvas(node).then(function (canvas) {
          document.body.appendChild(canvas);
        });
      }
    }
  }
}
