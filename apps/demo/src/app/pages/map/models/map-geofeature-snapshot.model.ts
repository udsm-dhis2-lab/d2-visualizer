import { GeoFeature } from "./map-geofeature.model";

export interface GeoFeatureSnapshot {
  id: string;
  geoFeatures: GeoFeature[];
}
