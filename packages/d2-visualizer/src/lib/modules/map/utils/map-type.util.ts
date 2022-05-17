import { ThematicDrawableMap } from '../class/thematic.class';
import { MapAnalytic } from '../models/map-analytic.model';
import { MapDrawablePayload } from '../models/map-drawable-payload.model';
import { GeoFeature } from '../models/map-geofeature.model';
import { MapUtil } from './map.util';

/**
 *
 */
export class D2MapEngine extends ThematicDrawableMap {
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
    setMapType(type: string): D2MapEngine {
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
     * @param geoFeature
     * @param mapAnalytic
     * @returns
     */
    getMapDrawablePayload(
        type: string,
        mapUtil: MapUtil,
        geoFeature: GeoFeature,
        mapAnalytic: MapAnalytic
    ): MapDrawablePayload | any {
        this.setMapType(type);

        if (this.type === 'thematic') {
            const thematicDrawableMap = new ThematicDrawableMap();
            return thematicDrawableMap.getMapFeaturePayload(
                mapUtil,
                geoFeature,
                mapAnalytic
            );
        }
    }
}
