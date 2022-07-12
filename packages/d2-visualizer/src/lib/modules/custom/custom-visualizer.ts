import { BaseVisualizer, Visualizer } from '../../shared/base-visualizer';
import { VisualizationDataSelection } from '../../shared/visualization-data-selection';
import { CustomVisualizationTemplate } from './models/custom-visualization-template.model';
import { keys, uniqBy } from 'lodash';

export class CustomVisualizer extends BaseVisualizer implements Visualizer {
  /**
   *
   * @param template
   * @returns
   */
  get template(): CustomVisualizationTemplate {
    if (!this._config?.customTemplate) {
      throw new Error('Template must be provided');
    }
    return this._config.customTemplate as CustomVisualizationTemplate;
  }

  draw() {
    const renderingElement = document.getElementById(this._id);

    const dataVariables = this.template.html.match(/\{{([^{^)]+)}}/g);

    dataVariables?.forEach((dataVariable) => {
      const dataDimensions = dataVariable
        .replace(/[{}']/g, '')
        .split(';')
        .map((dimensionVariable) => {
          const dimensionParams = dimensionVariable.split(':');

          return {
            dimension: dimensionParams[0],
            items: [
              {
                id: dimensionParams[1],
              },
            ],
          };
        });
    });

    console.log(dataVariables);
    if (renderingElement) {
      renderingElement?.replaceChildren();
      renderingElement.innerHTML = `
      <style>${this.template.cssStyles}</style>
      ${this.template.html}
      `;
    }
  }
}
