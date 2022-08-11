import * as _ from 'lodash';
import { D2MapEngine } from '../utils/map-engine.util';
import { MapAnalytics } from '../models/map-analytic.model';
import {
    MapDashboardExtensionItem,
    MapViewExtension,
} from '../models/map-dashboard-extension.model';
import { MapDashboardItem, MapView } from '../models/map-dashboard-item.model';
import { MapDrawablePayload } from '../models/map-drawable-payload.model';
import { GeoFeatureSnapshot } from '../models/map-geofeature-snapshot.model';
import { GeoFeature } from '../models/map-geofeature.model';
import { MapUtil } from '../utils/map.util';
import * as turf from '@turf/turf';
import { Legend, LegendSet } from '../models/legend-set.model';
import * as mapboxgl from 'mapbox-gl';
import { OrganisationUnitGroup } from '../models/organisation-unit-group.model';
import { FacilityThematicDrawableMap } from './facility.thematic';

/**
 *
 */
export class ThematicDrawableMap extends D2MapEngine {
    /**
     * @description Set map type
     */
    private type: string;

    /**
     * @description Set map type
     */
    constructor() {
        super();
        this.type = 'thematic';
    }

    /**
     *
     * @param type
     * @returns
     */
    setMapType(type: string): ThematicDrawableMap {
        this.type = type;
        return this;
    }

    /**
     *
     * @returns
     */
    getMapType(): string {
        return this.type;
    }

    /**
     *
     * @param type
     * @param mapUtil
     * @param geoFeatures
     * @param mapAnalytics
     * @returns
     */
    getMapDrawablePayload(
        type: string,
        mapUtil: MapUtil,
        geoFeatures: GeoFeatureSnapshot[],
        mapAnalytics: MapAnalytics[],
        mapDashboardItem: MapDashboardItem,
        mapDashboardExtensionItem: MapDashboardExtensionItem,
        organisationUnitGroups: OrganisationUnitGroup[]
    ): MapDrawablePayload[] | any {
        this.setMapType(type);

        const thematicDrawableMap = new D2MapEngine();

        const mapLayers = [];

        const mapDashboardItemSanitized: MapDashboardItem =
            this.getSanitizedMapDrawableItem(
                mapDashboardItem,
                mapDashboardExtensionItem
            );

        const geoFeatureObject: { [key: string]: GeoFeatureSnapshot } = _.keyBy(
            geoFeatures,
            'id'
        );

        const analyticsObject: { [key: string]: MapAnalytics } = _.keyBy(
            mapAnalytics,
            'id'
        );

        if (mapDashboardItemSanitized) {
            for (const mapItem of mapDashboardItemSanitized.map.mapViews) {
                const sanitizedGeofeatures: GeoFeature[] =
                    mapItem &&
                        mapItem.id &&
                        geoFeatureObject &&
                        geoFeatureObject[mapItem.id] &&
                        geoFeatureObject[mapItem.id].geoFeatures
                        ? geoFeatureObject[mapItem.id].geoFeatures
                        : [];

                const sanitizedAnalytics: MapAnalytics | any =
                    mapItem &&
                        mapItem.id &&
                        analyticsObject &&
                        analyticsObject[mapItem.id]
                        ? analyticsObject[mapItem.id]
                        : [];

                if (
                    mapItem &&
                    mapItem.layer &&
                    _.toUpper(_.trim(mapItem.layer)) === 'THEMATIC'
                ) {
                    // Implement Section
                    const mapDrawablePayload: MapDrawablePayload =
                        thematicDrawableMap.getMapFeaturePayload(
                            mapUtil,
                            mapItem,
                            sanitizedGeofeatures,
                            sanitizedAnalytics
                        );
                    mapLayers.push({ ...mapDrawablePayload, id: mapItem.id });
                } else if (
                    mapItem &&
                    mapItem.layer &&
                    _.toUpper(_.trim(mapItem.layer)) === 'FACILITY'
                ) {
                    const facilityThematicDrawableMap = new FacilityThematicDrawableMap();
                    // Implement Facility Map
                    const mapDrawablePayload: MapDrawablePayload =
                        facilityThematicDrawableMap.getFacilityMapFeaturePayload(
                            mapUtil,
                            mapItem,
                            sanitizedGeofeatures,
                            organisationUnitGroups
                        );

                    mapLayers.push({ ...mapDrawablePayload, id: mapItem.id });
                } else {
                    // Implement Section
                }
            }
            return mapLayers;
        }

        // if (this.type === 'thematic') {
        //     const thematicDrawableMap = new ThematicDrawableMap();
        //     return thematicDrawableMap.getMapFeaturePayload(
        //         mapUtil,
        //         geoFeatures,
        //         mapAnalytics
        //     );
        // }
    }

    getSanitizedMapDrawableItem(
        mapDashboardItem: MapDashboardItem,
        mapDashboardExtensionItem: MapDashboardExtensionItem
    ): MapDashboardItem {
        return {
            ...mapDashboardItem,
            map: {
                ...mapDashboardItem.map,
                mapViews: _.map(mapDashboardItem.map.mapViews, (mapView: MapView) => {
                    const mapViewExtensionObject: { [key: string]: MapViewExtension } =
                        _.keyBy(mapDashboardExtensionItem.map.mapViews, 'id');

                    return {
                        ...mapView,
                        layer:
                            mapView &&
                                mapView.id &&
                                mapViewExtensionObject &&
                                mapViewExtensionObject[mapView.id] &&
                                mapViewExtensionObject[mapView.id].layer
                                ? mapViewExtensionObject[mapView.id].layer
                                : mapView.layer,
                        thematicMapType:
                            mapView &&
                                mapView.id &&
                                mapViewExtensionObject &&
                                mapViewExtensionObject[mapView.id] &&
                                mapViewExtensionObject[mapView.id].thematicMapType
                                ? mapViewExtensionObject[mapView.id].thematicMapType
                                : mapView.thematicMapType,
                    };
                }),
            },
        };
    }

    public getLegendSetInfoFromDrawablePayload = (
        legendSets: LegendSet[],
        mapDrawablePayload: MapDrawablePayload
    ) => {
        const legendSetObject: { [key: string]: LegendSet } = _.keyBy(
            legendSets,
            'id'
        );
        return legendSetObject &&
            mapDrawablePayload &&
            mapDrawablePayload.legendSet &&
            legendSetObject[mapDrawablePayload.legendSet]
            ? legendSetObject[mapDrawablePayload.legendSet]
            : legendSets[0];
    };

    public getMapLegendSet = (legendSet: LegendSet): string[] => {
        const legends: Legend[] = _.orderBy(legendSet.legends, ['startValue']);
        return legendSet && legendSet.legends
            ? (_.flatMapDeep([
                _.head(legends)?.startValue,
                _.head(legends)?.color,
                ..._.map(_.drop(legends), (legend: Legend) => {
                    return [+`${legend.startValue}`, `${legend.color}`];
                }),
            ]) as string[])
            : [];
    };

    public getMaxValueInLegendSet = (legendSet: LegendSet): number[] => {
        const legends: Legend[] = _.orderBy(legendSet.legends, ['startValue']);
        return _.map(legends, (legend: Legend) => {
            return +legend.endValue;
        });
    };

    public getBubbleCircleRadiusFromLegendSet = (
        maxLegendSetPoints: number[]
    ): number[] => {
        const masterCircleCollections: number[] = [
            10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
        ];
        const combinedPoints: any[][] = _.zip(
            masterCircleCollections,
            maxLegendSetPoints
        ) as any[][];

        const withNoNullPoints: number[][] = _.map(
            combinedPoints,
            (combinedPoints: any[]) => {
                return _.compact(combinedPoints);
            }
        ) as number[][];

        return _.dropRight(
            _.flatten(
                _.filter(withNoNullPoints, (withNoNullPoint: number[]) => {
                    return withNoNullPoint.length > 1;
                })
            )
        ) as number[];
    };

    public drawNormalThematicLayer(
        mapUtil: MapUtil,
        d2MapEngine: ThematicDrawableMap,
        map: any,
        mapContainerSourceId: string,
        mapDrawablePayload: MapDrawablePayload,
        legendSetContainerId: string,
        mapTitleContainerId: string,
        mapAnalytics: MapAnalytics
    ) {
        // Add Map Source
        const mapDrawableSource = `${mapContainerSourceId}_${mapDrawablePayload?.id}`;

        map.addSource(
            mapDrawableSource,
            _.omit(mapDrawablePayload, [
                'id',
                'mapType',
                'legendSet',
            ]) as mapboxgl.AnySourceData
        );

        const mapLayerId = _.trim(
            `${mapDrawablePayload && mapDrawablePayload?.id
                ? mapDrawablePayload?.id
                : mapDrawableSource
            }`
        );

        // Get Legend Set
        const legendSets: LegendSet[] = mapUtil.getLegendSet();

        const selectedLegendSet: LegendSet =
            d2MapEngine.getLegendSetInfoFromDrawablePayload(
                legendSets,
                mapDrawablePayload
            );

        if (selectedLegendSet) {
            // Legend Set for MAP
            const mapLegendSet: string[] =
                d2MapEngine.getMapLegendSet(selectedLegendSet);

            map.addLayer({
                id: `${mapLayerId}_layer`,
                type: 'fill',
                source: mapDrawableSource, // reference the data source
                layout: {},
                paint: {
                    'fill-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'datavalue'],
                        ...mapLegendSet,
                    ],
                    'fill-opacity': 1,
                },
            });

            // Map Typograph Management
            if (mapUtil.getShowLabel()) {
                map.addLayer({
                    id: `${mapLayerId}_label`,
                    type: 'symbol',
                    source: mapDrawableSource,
                    layout: {
                        'text-field': [
                            'format',
                            ['upcase', ['get', 'description']],
                            { 'font-scale': 0.7 },
                            '\n',
                            {},
                            mapUtil.getShowValue() ? ['downcase', ['get', 'value']] : '',
                            { 'font-scale': 0.6 },
                        ],
                        'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                        'text-radial-offset': 0,
                        'text-justify': 'auto',
                        'icon-image': ['get', 'icon'],
                        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    },
                });
            }

            if (mapUtil.getShowBoundary()) {
                // Adding Boundary Layer
                map.addLayer({
                    id: `${mapLayerId}_boundary`,
                    type: 'line',
                    source: mapDrawableSource,
                    layout: {},
                    paint: {
                        'line-color': '#000',
                        'line-width': 1,
                    },
                });
            }

            // Appending Legend To The DOM
            this.createLegendSet(
                mapUtil,
                d2MapEngine,
                mapAnalytics,
                legendSets[0],
                legendSetContainerId
            );

            // Added Map Title
            this.createMapTitle(
                mapAnalytics,
                mapUtil.getShowMapTitle(),
                mapTitleContainerId
            );

            // Remove Details Section On Start
            const infoContainerId = mapUtil.getInfoContainerId();
            const featuresDOMElement = document.getElementById(infoContainerId);
            if (featuresDOMElement) {
                featuresDOMElement.style.display = 'none';
            }

            // When a click event occurs on a feature in the states layer,
            // open a popup at the location of the click, with description
            // HTML from the click event's properties.
            map.on('click', mapLayerId, (mapMouseEvent: any) => {
                const description = mapMouseEvent.features[0].properties.description;
                const value = mapMouseEvent.features[0].properties.value;

                const popUpMessage = `<p>${description ? description : ''
                    } (${value})</p>`;

                // Create a popup, but don't add it to the map yet.
                const mapBoxPopUp = new mapboxgl.Popup({
                    closeButton: true,
                    closeOnClick: true,
                });

                mapBoxPopUp
                    .setLngLat(mapMouseEvent.lngLat)
                    .setHTML(popUpMessage)
                    .addTo(map);

                map.flyTo({
                    center: mapMouseEvent.features[0].geometry.coordinates,
                });
            });

            // On Mouse Move
            map.on('mousemove', mapLayerId, (event: any) => {
                map.getCanvas().style.cursor = 'pointer';

                // Create a popup, but don't add it to the map yet.
                const mapBoxPopUp = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false,
                });

                if (mapUtil.getShowMapSummary()) {
                    const mapboxGeoJSONFeature: mapboxgl.MapboxGeoJSONFeature[] =
                        map.queryRenderedFeatures(event.point, {
                            layers: [mapContainerSourceId],
                        });
                    // Added support for hover details on map
                    this.createHoverDetails(
                        mapboxGeoJSONFeature,
                        mapAnalytics,
                        infoContainerId
                    );
                }
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', mapLayerId, () => {
                map.getCanvas().style.cursor = '';
            });
        } else {
            console.log(`Legend Set Not Found for ${mapLayerId}`);
        }
    }

    public drawBubbleThematicLayer(
        mapUtil: MapUtil,
        d2MapEngine: ThematicDrawableMap,
        map: any,
        mapDrawablePayload: MapDrawablePayload,
        mapContainerSourceId: string
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

        // Get Legend Set
        const legendSets: LegendSet[] = mapUtil.getLegendSet();

        const selectedLegendSet: LegendSet =
            d2MapEngine.getLegendSetInfoFromDrawablePayload(
                legendSets,
                mapDrawablePayload
            );

        if (selectedLegendSet) {
            // Legend Set for MAP
            const mapLegendSet: string[] =
                d2MapEngine.getMapLegendSet(selectedLegendSet);

            // Max Legend Set Points for MAP
            const maxLegendSetPoints: number[] =
                d2MapEngine.getMaxValueInLegendSet(selectedLegendSet);

            // MAPBOX Bubble Legend Set Values
            const bubbleCircleRadiiFromLegendSet: number[] =
                d2MapEngine.getBubbleCircleRadiusFromLegendSet(maxLegendSetPoints);

            map.addLayer({
                id: `${mapLayerId}_layer`,
                type: 'circle',
                source: mapDrawableSource,
                filter: ['has', 'mag'],
                paint: {
                    'circle-color': ['step', ['get', 'mag'], '#eeeeee', ...mapLegendSet],
                    'circle-radius': [
                        'step',
                        ['get', 'mag'],
                        ...bubbleCircleRadiiFromLegendSet,
                    ],
                },
            });

            map.addLayer({
                id: `${mapLayerId}_layer_clustered`,
                type: 'symbol',
                source: mapDrawableSource,
                filter: ['has', 'mag'],
                layout: {
                    'text-field': '{mag}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12,
                },
            });

            map.addLayer({
                id: `${mapLayerId}_layer_unclustered`,
                type: 'circle',
                source: mapDrawableSource,
                filter: ['!', ['has', 'mag']],
                paint: {
                    'circle-color': '#11b4da',
                    'circle-radius': 4,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#fff',
                },
            });
        } else {
            console.log(`Legend Set Not Found for ${mapLayerId}`);
        }
    }

    /**
     *
     */
    public createLegendSet(
        mapUtil: MapUtil,
        d2MapEngine: ThematicDrawableMap,
        mapAnalytics: MapAnalytics,
        legendSet: LegendSet,
        legendSetContainerId: string
    ) {
        const legendDOMElement = document.getElementById(legendSetContainerId);
        const showLegend: boolean = mapUtil.getShowLegend();

        if (
            showLegend &&
            legendSet &&
            legendSet.legends &&
            legendSet.legends.length
        ) {
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
            const legendTableHeadHorizontalLine = document.createElement('hr');

            legendTableHeadHorizontalLine.setAttribute('style', `width: 100%`);

            legendTableDataItemTitleSection.innerHTML = `<label>${legendSet?.name}</label>`;
            legendTableDataItemTitleSection.setAttribute('colspan', '3');
            legendTableHRLineTDItem.setAttribute('colspan', '3');

            legendTableHeadItem.appendChild(legendTableDataItemTitleSection);
            legendTableHead.appendChild(legendTableHeadItem);
            legendTableItem.appendChild(legendTableHead);
            legendTableHRLineTDItem.appendChild(legendTableHeadHorizontalLine);
            legendTableHRLineItem.appendChild(legendTableHRLineTDItem);
            legendTableHead.appendChild(legendTableHRLineItem);

            const dataValueIndex: number = d2MapEngine.getAnalyticHeaderMetadataIndex(
                mapAnalytics,
                'value'
            );

            const values: number[] = _.map(
                mapAnalytics.rows,
                (row: string[]) => +row[dataValueIndex]
            );

            const legendsWithCountValues: Legend[] = _.map(
                legendSet.legends,
                (legend: Legend) => {
                    return {
                        ...legend,
                        itemCount: _.filter(values, (value: number) => {
                            return value >= legend.startValue && value <= legend.endValue;
                        })?.length,
                    };
                }
            );

            const legends: Legend[] = _.orderBy(legendsWithCountValues, [
                'startValue',
            ]) as Legend[];

            for (const legend of legends) {
                const legendTableRowItem = document.createElement('tr');

                const legendTableDataItemColorSection = document.createElement('td');
                legendTableDataItemColorSection.setAttribute(
                    'style',
                    `width: 20px; margin-right: 10px !important; font-weight: bold !important;`
                );

                const legendTableDataItemLabel = document.createElement('td');
                const legendTableDataItemCount = document.createElement('td');

                legendTableDataItemColorSection.style.backgroundColor = legend?.color;
                legendTableDataItemLabel.innerHTML = `<label>${legend?.name} ${legend?.startValue} - ${legend?.endValue} (${legend?.itemCount})</label>`;
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
    createHoverDetails(
        mapboxGeoJSONFeature: mapboxgl.MapboxGeoJSONFeature[],
        mapAnalytics: MapAnalytics,
        infoContainerId: string
    ) {
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

            const periodName =
                mapAnalytics &&
                    periodId &&
                    mapAnalytics.metaData &&
                    mapAnalytics.metaData.items &&
                    mapAnalytics.metaData.items[periodId] &&
                    mapAnalytics.metaData.items[periodId].name
                    ? mapAnalytics.metaData.items[periodId].name
                    : '';

            const mapInfoDOMElement = document.getElementById(infoContainerId);
            const info: any = _.head(mapboxGeoJSONFeature);

            let htmlCode = ``;
            if (mapInfoDOMElement) {
                mapInfoDOMElement.style.display = 'block';
                if (dataName && mapboxGeoJSONFeature) {
                    htmlCode += `<table>`;
                    htmlCode += `<thead>`;
                    htmlCode += `</thead>`;
                    htmlCode += `<tbody>`;

                    if (
                        info &&
                        info.properties &&
                        info.properties.value &&
                        info.properties.value
                    ) {
                        htmlCode += `<tr>`;
                        htmlCode += `<td><b>Region:</b><label>${info.properties?.description}</label></td>`;
                        htmlCode += `</tr>`;
                        htmlCode += `<tr>`;
                        htmlCode += `<td><b>Data:</b><label>${indicatorName}</label></td>`;
                        htmlCode += `</tr>`;
                        htmlCode += `<tr>`;
                        htmlCode += `<td><b>Period:</b><label>${periodName}</label></td>`;
                        htmlCode += `</tr>`;
                        htmlCode += `<tr>`;
                        htmlCode += `<td><b>Value:</b><label>${info.properties.value}</label></td>`;
                        htmlCode += `</tr>`;
                    } else {
                        htmlCode += `<td>Hover on the map for more info! </td>`;
                        htmlCode += `</tr>`;
                        htmlCode += `</tr>`;
                    }
                    htmlCode += `<tfoot>`;
                    htmlCode += `</tfoot>`;
                    mapInfoDOMElement.innerHTML = htmlCode;
                } else {
                    mapInfoDOMElement.innerHTML = `<p>Hover over a state!</p>`;
                }
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
