export interface MapDrawablePayload {
  type: string;
  data: Data;
}

export interface Data {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  id: string | number;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: string | number[][][] | any;
}

export interface Properties {
  description: string;
  value: string;
  datavalue: number;
  color: string;
}
