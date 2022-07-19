export class TrackedEntityInstanceData {
  constructor(private trackedEntityInstances: any[]) {}

  getEnrollmentCount(): number {
    return (this.trackedEntityInstances || []).reduce(
      (totalCount: number, trackerEntityInstance) =>
        totalCount + trackerEntityInstance.enrollments?.length,
      0
    );
  }

  getExpressionData(dataVariableDimension: any): number {
    console.log(dataVariableDimension);
    switch (dataVariableDimension.dx) {
      case 'enrollment_count':
        return this.getEnrollmentCount();

      default:
        return 0;
    }
  }
}
