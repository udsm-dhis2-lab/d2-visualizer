export class TrackedEntityFilterUtil {
  static filterTrackedEntityInstancesByExpression(
    trackedEntityInstances: any[],
    filter: string
  ) {
    return (trackedEntityInstances || []).filter((trackedEntityInstance) => {
      return TrackedEntityFilterUtil.evaluateAttributeFilterExpression(
        filter,
        trackedEntityInstance.attributes
      );
    });
  }

  static evaluateAttributeFilterExpression(filter: string, attributes: any[]) {
    let result = false;
    try {
      let newFilter = filter;
      const attributeVariables = filter?.match(/A<[a-zA-Z0-9]{11}>/g);

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
}
