import { DownloadFormat } from './download-format.model';

interface IVisualizationDownloader {
  filename: string;
  htmlTable?: string;
  csvContent?: string;
  downloadFormat?: DownloadFormat;
}
export class VisualizationDownloader {
  filename!: string;
  htmlTable?: any;
  csvContent?: string;
  downloadFormat?: DownloadFormat;
  elementId!: string;
  constructor(config?: IVisualizationDownloader) {
    this.filename = config?.filename || 'filename';
    this.htmlTable = config?.htmlTable;
    this.csvContent = config?.csvContent;
  }

  setElementId(id: string) {
    this.elementId = id;
    return this;
  }

  setFormat(format: DownloadFormat) {
    this.downloadFormat = format;
    return this;
  }

  setFilename(filename: string): VisualizationDownloader {
    this.filename = filename;
    return this;
  }

  setCSV(csvContent: string): VisualizationDownloader {
    this.csvContent = csvContent;
    this.downloadFormat = 'CSV';
    return this;
  }

  download() {
    switch (this.downloadFormat) {
      case 'CSV': {
        const tableElement = document?.getElementById(this.elementId);
        this.csvContent = this._tableToCSV(tableElement);
        this.toCsv();
        break;
      }
      default:
        break;
    }
  }
  toCsv() {
    if (!this.csvContent) {
      throw new Error('CSV content is not supplied');
    }

    const blob = new Blob([this.csvContent], { type: 'text/csv' });

    if ((navigator as any).msSaveOrOpenBlob) {
      (navigator as any).msSaveOrOpenBlob(blob, this.filename + '.csv');
    } else {
      this._downloadAnchor(URL.createObjectURL(blob), 'csv', this.filename);
    }
  }

  private _tableToCSV(table: any) {
    const slice = Array.prototype.slice;

    return slice
      .call(table.rows)
      .map(function (row) {
        return slice
          .call(row.cells)
          .map(function (cell) {
            return '"t"'.replace('t', cell.textContent);
          })
          .join(',');
      })
      .join('\r\n');
  }

  private _downloadAnchor(content: any, ext: any, filename: string) {
    const anchor = document.createElement('a');
    anchor.style.display = '!important';
    anchor.id = 'downloadanchor';
    document.body.appendChild(anchor);

    if ('download' in anchor) {
      anchor.download = filename + '.' + ext;
    }
    anchor.href = content;
    anchor.click();
    anchor.remove();
  }
}
