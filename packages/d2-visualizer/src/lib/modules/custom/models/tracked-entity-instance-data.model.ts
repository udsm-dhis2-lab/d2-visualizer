import { flatten } from 'lodash';
export class TrackedEntityInstanceData {
  private _attributes;
  constructor(private trackedEntityInstances: any[]) {
    this._attributes = this.getAttributes(trackedEntityInstances);
  }

  private getAttributes(trackedEntityInstances: any[]): any[] {
    return flatten(
      trackedEntityInstances.map(
        (trackedEntityInstance) => trackedEntityInstance.attributes
      )
    );
  }

  private evaluateAttributeFilterExpression(filter: string, attributes: any[]) {
    let result = false;
    try {
      let newFilter = filter;
      const attributeVariables = filter?.match(/\A<([^{^)]+)>/g);
      attributeVariables?.forEach((attributeVariable) => {
        const attributeId = attributeVariable?.match(/\<([^{^)]+)>/g)?.join();

        const availableAttributeValue = (attributes || []).find(
          (attribute: any) => `<${attribute.attribute}>` === attributeId
        );

        if (availableAttributeValue) {
          newFilter = newFilter?.replace(
            new RegExp(attributeVariable, 'g'),
            `'${availableAttributeValue.value}'`
          );
        }
      });
      result = Function('return ' + newFilter)();
    } catch (e) {
      console.warn('FILTER ERROR::', e);
    }

    return result;
  }

  private filterTrackedEntityInstancesByExpression(filter: string) {
    return (this.trackedEntityInstances || []).filter(
      (trackedEntityInstance) => {
        return this.evaluateAttributeFilterExpression(
          filter,
          trackedEntityInstance.attributes
        );
      }
    );
  }

  getEnrollmentCount(filter?: string): number {
    return (
      filter
        ? this.filterTrackedEntityInstancesByExpression(filter)
        : this.trackedEntityInstances || []
    ).reduce(
      (totalCount: number, trackerEntityInstance) =>
        totalCount + trackerEntityInstance.enrollments?.length,
      0
    );
  }

  getPercent(dataVariable: string) {
    const percentageVariable = dataVariable
      ?.replace(/(^PERCENT<)|(>$)/g, '')
      ?.replace(/\s/g, '');
    const numeratorVariable = (percentageVariable?.match(
      /(COUNT|SUM)<.+?(?=,COUNT|SUM)/g
    ) || [])[0];
    const denominatorVariable = (percentageVariable?.match(
      /(?=,COUNT|SUM).*/g
    ) || [])[0]?.substring(1);

    const numerator = this.getExpressionData(numeratorVariable);
    const denominator = this.getExpressionData(denominatorVariable);

    if (denominator === 0) {
      return 0;
    }
    return parseFloat(((numerator / denominator) * 100).toFixed(1));
  }

  getCount(dataVariable: string) {
    const splitedVariables = dataVariable
      .replace(/(^COUNT<)|(>$)/g, '')
      .split(',');

    switch (splitedVariables[0]) {
      case 'enrollment':
        return this.getEnrollmentCount(splitedVariables[1]);

      default:
        return 0;
    }
  }

  getExpressionData(dataVariable: string): number {
    /**
     * PERCENT EXPRESSION
     */
    if (dataVariable.indexOf('PERCENT') === 0) {
      return this.getPercent(dataVariable);
    }

    /**
     * COUNT EXPRESSION
     */
    if (dataVariable.indexOf('COUNT') === 0) {
      return this.getCount(dataVariable);
    }

    switch (dataVariable) {
      case 'COUNT<enrollment>':
        return this.getEnrollmentCount(dataVariable);
      default:
        return 0;
    }
  }
}
