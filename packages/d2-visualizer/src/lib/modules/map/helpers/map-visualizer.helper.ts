import { DhisGeoFeature } from '../interfaces/map.interface';

export function createMapFeatures(
  analytics: any,
  dhisGeofeatures: DhisGeoFeature[]
) {
  const rowItems = analyticsItemIndexes(analytics);
  return (analytics?.rows || []).map((row: string[], index: number) => {
    // const geofeatureType = mapData?.geoFeatures?.type || '';

    const orgunitCoordinates = dhisGeofeatures.filter(
      (geofeature) => geofeature.id === row[rowItems.ouIndex]
    );
    const orgunitCoordinateItem: DhisGeoFeature = orgunitCoordinates?.[0] ?? {};
    return {
      type: 'Feature',
      id: index,
      geometry: {
        type: 'Polygon',
        coordinates: JSON.parse(orgunitCoordinateItem.co),
      },
      properties: {
        datavalue: parseFloat(row[rowItems.valueIndex]),
        popupContents: `
        <h5>${orgunitCoordinateItem?.na}</h5>
        <p style="color: #6c757d">
            ${orgunitCoordinateItem?.pn}
        </p> 
        <p style="color: #6c757d">
          Total: ${row[rowItems.valueIndex]}
        </p>
        `,
      },
    };
  });
}

export function analyticsItemIndexes(analytics: any) {
  const dxIndex = (analytics?.headers || []).findIndex(
    (head: any) => head?.name === 'dx'
  );
  const peIndex = (analytics?.headers || []).findIndex(
    (head: any) => head?.name === 'pe'
  );
  const valueIndex = (analytics?.headers || []).findIndex(
    (head: any) => head?.name === 'value'
  );
  const ouIndex = (analytics?.headers || []).findIndex(
    (head: any) => head?.name === 'ou'
  );
  return { dxIndex, peIndex, valueIndex, ouIndex };
}
