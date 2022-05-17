import { MapAnalytic } from '../models/map-analytic.model';
import { MapDrawablePayload } from '../models/map-drawable-payload.model';
import { GeoFeature } from '../models/map-geofeature.model';
import { MapUtil } from '../utils/map.util';
import { MapDrawable } from '../class/map-drawable.class';
import * as _ from 'lodash';
import { Legend, LegendSet } from '../models/legend-set.model';

export class ThematicDrawableMap extends MapDrawable {
    /**
     *
     * @param mapUtil
     * @param mapAnalytic
     * @param geoFeature
     * @returns
     */
    public getMapFeaturePayload(
        mapUtil: MapUtil,
        geoFeature: GeoFeature,
        mapAnalytic: MapAnalytic
    ): MapDrawablePayload {
        // CHange Array of GeoFeature to Object of GeoFeature
        const geoFeatureObject: { [key: string]: GeoFeature } = _.keyBy(
            geoFeature,
            'id'
        );

        const isValueShown: boolean = mapUtil.getShowLabel();
        const isLabelShown: boolean = mapUtil.getShowLabel();

        // Get Index Reference for Organisation Unit in Map Analytics Header Info
        const ouIndex: number = this.getAnalyticHeaderMetadataIndex(
            mapAnalytic,
            'ou'
        );
        // Implement Map Feature
        return {
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
                                    description:
                                        isLabelShown &&
                                            mapAnalytic &&
                                            mapAnalytic.metaData &&
                                            mapAnalytic.metaData.items &&
                                            mapAnalytic.metaData.items[row[ouIndex]] &&
                                            mapAnalytic.metaData.items[row[ouIndex]].name &&
                                            row &&
                                            ouIndex &&
                                            row[ouIndex]
                                            ? mapAnalytic.metaData.items[row[ouIndex]].name
                                            : isValueShown
                                                ? `${row[
                                                this.getAnalyticHeaderMetadataIndex(
                                                    mapAnalytic,
                                                    'value'
                                                )
                                                ]
                                                }`
                                                : '',
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
    }

    public getAnalyticHeaderMetadataIndex = (
        mapAnalytic: MapAnalytic,
        lookUp: string
    ) => {
        return mapAnalytic && mapAnalytic.headers && lookUp
            ? _.findIndex(mapAnalytic.headers, (data) => {
                return _.trim(data.name) == _.trim(lookUp);
            })
            : 0;
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
}
