export class VisualizationLayout {
  rows: Array<string> = [];
  columns: Array<string> = [];
  filters: Array<string> = [];
  excluded?: Array<string>;

  static getLayout(): VisualizationLayout | null {
    return null;
  }
}
