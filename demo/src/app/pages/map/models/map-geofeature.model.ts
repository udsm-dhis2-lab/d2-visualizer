export interface GeoFeature {
  id: string;
  code?: string;
  na: string;
  hcd: boolean;
  hcu: boolean;
  le: number;
  pg?: string;
  pi?: string;
  pn?: string;
  ty: number;
  co: string;
  dimensions: { [key: string]: string };
}
