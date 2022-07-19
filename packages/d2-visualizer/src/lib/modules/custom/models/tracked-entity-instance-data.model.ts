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

  getExpressionData(dataVariableDimension: any): number {
    switch (dataVariableDimension.dx) {
      case 'enrollment_count':
        return this.getEnrollmentCount(dataVariableDimension.filter);

      default:
        return 0;
    }
  }
}
