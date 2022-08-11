import { MapAnalytics } from '../models/map-analytic.model';
import { MapDrawablePayload } from '../models/map-drawable-payload.model';
import { GeoFeature } from '../models/map-geofeature.model';
import { MapUtil } from './map.util';
import { MapDrawable } from '../class/map-drawable.class';
import * as _ from 'lodash';
import { Legend, LegendSet } from '../models/legend-set.model';
import { MapView } from '../models/map-dashboard-item.model';
import * as turf from '@turf/turf';
import { ThematicDrawableMap } from '../class/thematic.class';
import * as mapboxgl from 'mapbox-gl';
import { OrganisationUnitGroup } from '../models/organisation-unit-group.model';
import { FacilityThematicDrawableMap } from '../class/facility.thematic';

export class D2MapEngine extends MapDrawable {
    /**
     *
     * @returns
     */
    public getVisualizationColors(): string[] {
        return [
            '#A9BE3B',
            '#558CC0',
            '#D34957',
            '#FF9F3A',
            '#4FBDAE',
            '#968F8F',
            '#B7409F',
            '#FFDA64',
            '#B78040',
            '#676767',
            '#6A33CF',
            '#4A7833',
            '#434348',
            '#7CB5EC',
            '#F7A35C',
            '#F15C80',
        ];
    }

    /**
     *
     * @param mapUtil
     * @param mapAnalytic
     * @param geoFeatures
     * @returns
     */
    public getMapFeaturePayload(
        mapUtil: MapUtil,
        mapView: MapView,
        geoFeatures: GeoFeature[],
        mapAnalytic?: MapAnalytics,
    ): MapDrawablePayload | any {
        // CHange Array of GeoFeature to Object of GeoFeature
        const geoFeatureObject: { [key: string]: GeoFeature } = _.keyBy(
            geoFeatures,
            'id'
        );

        const isValueShown: boolean = mapUtil.getShowValue();
        const isLabelShown: boolean = mapUtil.getShowLabel();

        if (
            mapView &&
            mapView.thematicMapType &&
            _.toUpper(_.trim(mapView.thematicMapType)) === 'CHOROPLETH' &&
            mapAnalytic
        ) {
            // Get Index Reference for Organisation Unit in Map Analytics Header Info
            const ouIndex: number = this.getAnalyticHeaderMetadataIndex(
                mapAnalytic,
                'ou'
            );
            // Implement Map Feature
            return {
                mapType: mapView?.thematicMapType,
                legendSet: mapView?.legendSet?.id,
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features:
                        mapAnalytic && mapAnalytic.rows
                            ? _.map(mapAnalytic.rows, (row: string[]) => {
                                const geoFeatureId = row[ouIndex];
                                const mapCoordinates = JSON.parse(
                                    geoFeatureObject[geoFeatureId]?.co
                                );

                                return {
                                    type: 'Feature',
                                    id: geoFeatureId,
                                    geometry: {
                                        type: 'Polygon',
                                        coordinates:
                                            mapCoordinates && mapCoordinates.length > 1
                                                ? _.flatten(mapCoordinates) &&
                                                    _.flatten(mapCoordinates).length > 1
                                                    ? [_.flatten(_.flatten(mapCoordinates))]
                                                    : _.flatten(mapCoordinates)
                                                : mapCoordinates,
                                    },
                                    properties: {
                                        description: this.getToggleBetweenValueAndLabel(
                                            mapAnalytic,
                                            row,
                                            isLabelShown,
                                            isValueShown,
                                            ouIndex
                                        ),

                                        value: `${row[
                                            this.getAnalyticHeaderMetadataIndex(
                                                mapAnalytic,
                                                'value'
                                            )
                                            ]
                                            }`,
                                        datavalue: parseFloat(
                                            row[
                                            this.getAnalyticHeaderMetadataIndex(
                                                mapAnalytic,
                                                'value'
                                            )
                                            ]
                                        ),
                                        color: '#ffffff',
                                    },
                                };
                            })
                            : [],
                },
            };
        } else if (
            mapView &&
            mapView.thematicMapType &&
            _.toUpper(_.trim(mapView.thematicMapType)) === 'BUBBLE' &&
            mapAnalytic
        ) {
            // Get Index Reference for Organisation Unit in Map Analytics Header Info
            const ouIndex: number = this.getAnalyticHeaderMetadataIndex(
                mapAnalytic,
                'ou'
            );

            // Implement Return Statement
            return {
                mapType: mapView?.thematicMapType,
                legendSet: mapView?.legendSet?.id,
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    crs: {
                        type: 'name',
                        properties: {
                            name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
                        },
                    },
                    features:
                        mapAnalytic && mapAnalytic.rows
                            ? _.compact(
                                _.map(mapAnalytic.rows, (row: string[]) => {
                                    const geoFeatureId = row[ouIndex];
                                    const mapCoordinates = JSON.parse(
                                        geoFeatureObject[geoFeatureId]?.co
                                    );

                                    const dataValue: any = parseFloat(
                                        row[
                                        this.getAnalyticHeaderMetadataIndex(
                                            mapAnalytic,
                                            'value'
                                        )
                                        ]
                                    );

                                    if (
                                        mapCoordinates &&
                                        mapCoordinates[0] &&
                                        mapCoordinates[0].length > 100
                                    ) {
                                        const polygon = turf.polygon(
                                            mapCoordinates ? mapCoordinates : []
                                        );

                                        const centroid = turf.centroid(polygon);

                                        const centerOfMassPolygon = turf.polygon(mapCoordinates);

                                        const mapCenterOfMass =
                                            turf.centerOfMass(centerOfMassPolygon);

                                        return {
                                            type: 'Feature',
                                            id: geoFeatureId,
                                            geometry: {
                                                type: 'Point',
                                                coordinates:
                                                    mapCenterOfMass &&
                                                        mapCenterOfMass.geometry &&
                                                        mapCenterOfMass.geometry.coordinates
                                                        ? [
                                                            ...mapCenterOfMass.geometry.coordinates,
                                                            +dataValue,
                                                        ]
                                                        : [],
                                            },
                                            properties: {
                                                id: geoFeatureId,
                                                description: this.getToggleBetweenValueAndLabel(
                                                    mapAnalytic,
                                                    row,
                                                    isLabelShown,
                                                    isValueShown,
                                                    ouIndex
                                                ),
                                                mag: +dataValue,
                                                // value: dataValue,
                                                // datavalue: dataValue,
                                                // color: '#ffffff',
                                                time: 1507422626990,
                                                felt: null,
                                                tsunami: 0,
                                            },
                                        };
                                    } else {
                                        return null;
                                    }
                                })
                            )
                            : [],
                },
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
            };
        } else if (
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

    public getAnalyticHeaderMetadataIndex = (
        mapAnalytic: MapAnalytics,
        lookUp: string
    ) => {
        return mapAnalytic && mapAnalytic.headers && lookUp
            ? _.findIndex(mapAnalytic.headers, (data: any) => {
                return _.trim(data.name) == _.trim(lookUp);
            })
            : 0;
    };

    public getToggleBetweenValueAndLabel = (
        mapAnalytic: MapAnalytics,
        row: string[],
        showLabel: boolean,
        showValue: boolean,
        ouIndex: number
    ): any => {
        if (
            showLabel &&
            mapAnalytic.metaData &&
            mapAnalytic.metaData.items &&
            mapAnalytic.metaData.items[row[ouIndex]] &&
            mapAnalytic.metaData.items[row[ouIndex]].name &&
            row &&
            ouIndex &&
            row[ouIndex]
        ) {
            return _.capitalize(
                _.head(_.split(mapAnalytic.metaData.items[row[ouIndex]].name, ' '))
            );
        } else if (showValue) {
            return '';
        }
    };
}
