import { MapAnalytics } from '../models/map-analytic.model';
import { MapDrawablePayload } from '../models/map-drawable-payload.model';
import { GeoFeature } from '../models/map-geofeature.model';
import { MapUtil } from '../utils/map.util';
import * as _ from 'lodash';
import { MapView } from '../models/map-dashboard-item.model';
import * as turf from '@turf/turf';
import { OrganisationUnitGroup } from '../models/organisation-unit-group.model';
import { D2MapEngine } from '../utils/map-engine.util';

export class FacilityThematicDrawableMap extends D2MapEngine {
  /**
   *
   * @param mapUtil
   * @param mapAnalytic
   * @param geoFeatures
   * @returns
   */
  public getFacilityMapFeaturePayload(
    mapUtil: MapUtil,
    mapView: MapView,
    geoFeatures: GeoFeature[],
    organisationUnitGroups: OrganisationUnitGroup[]
  ): MapDrawablePayload | any {
    const isValueShown: boolean = mapUtil.getShowValue();
    const isLabelShown: boolean = mapUtil.getShowLabel();

    if (
      mapView &&
      mapView.layer &&
      _.toUpper(_.trim(mapView.layer)) === 'FACILITY'
    ) {

      return {
        mapType:
          mapView && mapView.layer
            ? _.toUpper(_.trim(mapView?.layer))
            : mapView?.thematicMapType,
        legendSet: mapView?.legendSet?.id,
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features:
            geoFeatures && geoFeatures.length
              ? _.map(geoFeatures, (geoFeature: GeoFeature) => {
                return {
                  type: 'Feature',
                  properties: {
                    description: '',
                    facilityGroup: this.getFacilityOrgUnitGroup(
                      geoFeature,
                      organisationUnitGroups
                    ),
                  },
                  geometry: {
                    type: 'Point',
                    coordinates:
                      geoFeature && geoFeature.co
                        ? JSON.parse(geoFeature.co)
                        : [],
                  },
                };
              })
              : [],
        },
      };
    }
  }

  public getFacilityOrgUnitGroup = (
    geoFeature: GeoFeature,
    organisationUnitGroups: OrganisationUnitGroup[]
  ) => {
    const dimensions: string[] = _.compact(
      _.map(_.keys(geoFeature.dimensions), (key: string) => {
        return geoFeature.dimensions[key];
      })
    );

    const selectedOrganisationUnitGroup: OrganisationUnitGroup = _.head(
      _.filter(
        organisationUnitGroups,
        (organisationUnitGroup: OrganisationUnitGroup) => {
          return _.includes(dimensions, organisationUnitGroup.id);
        }
      )
    ) as OrganisationUnitGroup;

    return selectedOrganisationUnitGroup && selectedOrganisationUnitGroup.id
      ? selectedOrganisationUnitGroup.id
      : 'Unknown';
  };

  public drawOrganisationUnitThematicLayer(
    mapUtil: MapUtil,
    map: any,
    mapDrawablePayload: MapDrawablePayload,
    mapContainerSourceId: string,
    organisationUnitGroups: OrganisationUnitGroup[],
    legendSetContainerId: string
  ) {
    // Add Map Source
    const mapDrawableSource = `${mapContainerSourceId}_${mapDrawablePayload?.id}`;

    map.addSource(
      `${mapDrawableSource}`,
      _.omit(mapDrawablePayload, [
        'id',
        'mapType',
        'legendSet',
      ]) as mapboxgl.AnySourceData
    );

    const mapLayerId = _.trim(
      `${mapDrawablePayload && mapDrawablePayload?.id
        ? mapDrawablePayload?.id
        : mapContainerSourceId
      }`
    );

    map.addLayer({
      id: `${mapLayerId}_layer`,
      type: 'circle',
      source: mapDrawableSource,
      filter: ['has', 'facilityGroup'],
      paint: {
        'circle-radius': 6,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#ffffff',
        // Color circles by ethnicity, using a `match` expression.
        'circle-color': [
          'match',
          ['get', 'facilityGroup'],
          ...this.combineLegendWithValues(organisationUnitGroups),
        ],
      },
    });
    this.createLegendSet(mapUtil, legendSetContainerId, organisationUnitGroups);
  }

  public combineLegendWithValues(
    organisationUnitGroups: OrganisationUnitGroup[]
  ) {
    return _.flatten([
      ..._.map(
        organisationUnitGroups,
        (organisationUnitGroup: OrganisationUnitGroup, index: number) => {
          return [
            organisationUnitGroup && organisationUnitGroup.id
              ? organisationUnitGroup.id
              : '',
            this.getVisualizationColors()[index],
          ];
        }
      ),
      '#cccccc',
    ]);
  }

  /**
   *
   */
  public createLegendSet(
    mapUtil: MapUtil,
    legendSetContainerId: string,
    organisationUnitGroups: OrganisationUnitGroup[]
  ) {
    const legendDOMElement = document.getElementById(legendSetContainerId);
    const showLegend: boolean = mapUtil.getShowLegend();

    if (legendSetContainerId) {
      if (legendDOMElement) {
        legendDOMElement.innerHTML = '';
        legendDOMElement.style.display = 'block';
      }

      const legendDIVItem: HTMLDivElement = document.createElement('div');
      const legendTableItem = document.createElement('table');
      const legendTableBodyItem = document.createElement('tbody');
      const legendTableHead = document.createElement('thead');
      const legendTableHeadItem = document.createElement('tr');
      const legendTableHRLineItem = document.createElement('tr');
      const legendTableHRLineTDItem = document.createElement('td');

      const legendTableDataItemTitleSection = document.createElement('th');
      // const legendTableHeadHorizontalLine = document.createElement('hr');

      // legendTableHeadHorizontalLine.setAttribute('style', `width: 100%`);

      legendTableDataItemTitleSection.innerHTML = `<label>Facility Group</label>`;
      legendTableDataItemTitleSection.setAttribute('colspan', '3');
      legendTableHRLineTDItem.setAttribute('colspan', '3');

      legendTableHeadItem.appendChild(legendTableDataItemTitleSection);
      legendTableHead.appendChild(legendTableHeadItem);
      legendTableItem.appendChild(legendTableHead);
      // legendTableHRLineTDItem.appendChild(legendTableHeadHorizontalLine);
      legendTableHRLineItem.appendChild(legendTableHRLineTDItem);
      legendTableHead.appendChild(legendTableHRLineItem);

      for (const [
        index,
        organisationUnitGroup,
      ] of organisationUnitGroups.entries()) {
        const legendTableRowItem = document.createElement('tr');

        const legendTableDataItemColorSection = document.createElement('td');
        legendTableDataItemColorSection.setAttribute(
          'style',
          `width: 20px; margin-right: 10px !important; font-weight: bold !important;`
        );

        const legendTableDataItemLabel = document.createElement('td');
        const legendTableDataItemCount = document.createElement('td');

        // legendTableDataItemColorSection.style.backgroundColor = legend?.color;
        legendTableDataItemColorSection.innerHTML = `<span></span>`;
        legendTableDataItemColorSection.setAttribute(
          'style',
          `width: 18px; height; 10px; border-radius: 50%; margin-right: 20px; border: 1px solid #000; background-color: ${this.getVisualizationColors()[index]
          }`
        );

        legendTableDataItemLabel.innerHTML = `<label style="margin-left: 10px"> ${organisationUnitGroup?.name} </label>`;
        // legendTableDataItemCount.innerHTML = `${legend?.name}`;

        legendTableRowItem.appendChild(legendTableDataItemColorSection);
        legendTableRowItem.appendChild(legendTableDataItemLabel);
        legendTableRowItem.appendChild(legendTableDataItemCount);
        legendTableBodyItem.appendChild(legendTableRowItem);
        legendTableItem.appendChild(legendTableBodyItem);
        legendDIVItem.appendChild(legendTableItem);
        legendDOMElement?.appendChild(legendDIVItem);
      }
    } else {
      if (legendDOMElement) {
        legendDOMElement.innerHTML = '';
        legendDOMElement.style.display = 'none';
      }
    }
  }

  /**
   *
   */
  createMapTitle(
    mapAnalytics: MapAnalytics,
    showMapTitle: boolean,
    mapTitleContainerId: string
  ) {
    const mapTitleDOMElement = document.getElementById(mapTitleContainerId);

    if (showMapTitle) {
      const dataName: string | undefined =
        mapAnalytics &&
          mapAnalytics.metaData &&
          mapAnalytics.metaData.dimensions &&
          mapAnalytics.metaData.dimensions.dx &&
          _.head(mapAnalytics.metaData.dimensions.dx)
          ? _.head(mapAnalytics.metaData.dimensions.dx)
          : '';

      if (dataName) {
        const indicatorName: string =
          mapAnalytics &&
            mapAnalytics.metaData &&
            mapAnalytics.metaData.items &&
            mapAnalytics.metaData.items[dataName] &&
            mapAnalytics.metaData.items[dataName].name
            ? mapAnalytics.metaData.items[dataName].name
            : '';

        const periodId: string | undefined =
          mapAnalytics &&
            mapAnalytics.metaData &&
            mapAnalytics.metaData.dimensions &&
            mapAnalytics.metaData.dimensions.pe &&
            _.head(mapAnalytics.metaData.dimensions.pe)
            ? _.head(mapAnalytics.metaData.dimensions.pe)
            : '';

        if (mapTitleDOMElement && periodId && indicatorName) {
          const periodName =
            mapAnalytics &&
              mapAnalytics.metaData &&
              mapAnalytics.metaData.items &&
              mapAnalytics.metaData.items[periodId] &&
              mapAnalytics.metaData.items[periodId].name
              ? mapAnalytics.metaData.items[periodId].name
              : '';

          let htmlCode = ``;
          htmlCode += `<label>${indicatorName} - ${periodName}</label>`;

          mapTitleDOMElement.innerHTML = htmlCode;
        }
      }
    } else {
      if (mapTitleDOMElement) {
        mapTitleDOMElement.innerHTML = '';
      }
    }
  }
}
