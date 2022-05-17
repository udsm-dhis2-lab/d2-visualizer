import { LegendSet } from '../models/legend-set.model';
import { MapAnalytic } from '../models/map-analytic.model';
import { MapDrawablePayload } from '../models/map-drawable-payload.model';
import { GeoFeature } from '../models/map-geofeature.model';
import { MapUtil } from '../utils/map.util';

export abstract class MapDrawable {
    /**
     *
     */
    public abstract getMapFeaturePayload(
        mapUtil: MapUtil,
        geoFeature: GeoFeature,
        mapAnalytic: MapAnalytic
    ): MapDrawablePayload;

    /**
     *
     * @param mapAnalytic
     * @param lookUp
     */
    public abstract getAnalyticHeaderMetadataIndex(
        mapAnalytic: MapAnalytic,
        lookUp: string
    ): number;

    /**
     *
     * @param legendSet
     */
    public abstract getMapLegendSet(legendSet: LegendSet): string[];
}
