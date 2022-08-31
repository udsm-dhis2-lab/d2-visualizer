import { keys, unionBy, uniqBy } from 'lodash';
import { VisualizationDataSelection } from '../models/visualization-data-selection.model';

export function getCustomTemplateDataSelections(
  templateHTML: string,
  defaultDataSelections: VisualizationDataSelection[]
): VisualizationDataSelection[] {
  const dataVariables = templateHTML.match(/\{{([^{^)]+)}}/g);

  const results: { [dimension: string]: any[] } = (dataVariables || []).reduce(
    (variableObject, dataVariable) => {
      const dataDimensions = dataVariable
        .replace(/[{}']/g, '')
        .split(';')
        .reduce((dimensionObject: any, dimensionVariable) => {
          const dimensionParams = dimensionVariable.split(':');

          return {
            ...dimensionObject,
            [dimensionParams[0]]: uniqBy(
              [
                ...(dimensionObject[dimensionParams[0] as string] || []),
                { id: dimensionParams[1] },
              ],
              'id'
            ),
          };
        }, variableObject);

      return dataDimensions;
    },
    {}
  );

  return unionBy(
    keys(results).map((dimension: string) => ({
      dimension,
      items: results[dimension],
    })),
    defaultDataSelections,
    'dimension'
  );
}
