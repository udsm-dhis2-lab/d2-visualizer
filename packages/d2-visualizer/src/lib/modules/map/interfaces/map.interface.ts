export interface MapFeatures {
  type: string;
  id: string;
  geometry: Geometry;
  properties: {
    datavalue: string;
    popupContents: string;
  };
}

export interface Geometry {
  type: string;
  coordinates: string[];
}
