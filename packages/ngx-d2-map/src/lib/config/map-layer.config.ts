import { MapLayerConfig } from '../models/map-layer-config.model';

export const mapLayerConfigs: MapLayerConfig[] = [
  {
    id: 'streets',
    style: 'mapbox://styles/mapbox/streets-v11',
    name: 'Streets Layer',
  },
  {
    id: 'outdoors',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    name: 'Outdoors Layer',
  },
  {
    id: 'light',
    style: 'mapbox://styles/mapbox/light-v10',
    name: 'Light Layer',
  },
  {
    id: 'dark',
    style: 'mapbox://styles/mapbox/dark-v10',
    name: 'Dark Layer',
  },
  {
    id: 'satellite',
    style: 'mapbox://styles/mapbox/satellite-v9',
    name: 'Satellite Layer',
  },
  {
    id: 'satellite-streets',
    style: 'mapbox://styles/mapbox/satellite-streets-v11',
    name: 'Satellite Streets Layer',
  },
  {
    id: 'navigation-day',
    style: 'mapbox://styles/mapbox/navigation-day-v1',
    name: 'Navigation Day Layer',
  },
  {
    id: 'navigation-night',
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    name: 'Navigation Night Layer',
  },
];
