import { LegendSet } from '../models/legend-set.model';
import { MapAnalytics } from '../models/map-analytic.model';
import { MapView } from '../models/map-dashboard-item.model';
import { MapDrawablePayload } from '../models/map-drawable-payload.model';
import { GeoFeature } from '../models/geo-feature.model';
import { MapUtil } from '../utils/map.util';

export abstract class MapDrawable {
  /**
   *
   */
  public abstract getMapFeaturePayload(
    mapUtil: MapUtil,
    mapView: MapView,
    geoFeature: GeoFeature[],
    mapAnalytic: MapAnalytics
  ): MapDrawablePayload;

  /**
   *
   * @param mapAnalytic
   * @param lookUp
   */
  public abstract getAnalyticHeaderMetadataIndex(
    mapAnalytic: MapAnalytics,
    lookUp: string
  ): number;

  /**
   *
   * @param legendSet
   */
  public abstract getMapLegendSet(legendSet: LegendSet): string[];
}
