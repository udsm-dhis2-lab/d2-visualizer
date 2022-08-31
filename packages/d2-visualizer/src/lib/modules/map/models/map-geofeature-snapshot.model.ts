import { GeoFeature } from './geo-feature.model';

export interface GeoFeatureSnapshot {
  id: string;
  geoFeatures: GeoFeature[];
}
