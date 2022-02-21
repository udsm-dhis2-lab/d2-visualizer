import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ChartConfiguration } from 'demo/src/app/pages/chart/models/chart-viz.model';
import { SourceCodeConfig } from 'demo/src/app/pages/chart/models/source-code.model';

declare const monaco: any;

@Component({
  selector: 'iapps-ngx-drawer',
  templateUrl: './ngx-drawer.component.html',
  styleUrls: ['./ngx-drawer.component.scss'],
})
export class NgxDrawerComponent implements OnInit, OnChanges {
  @Input() isInfoOpen: boolean = false;
  @Input() sourceCodeConfig: any;
  @Input() code: string = '';

  @Output() cancel = new EventEmitter<boolean>();

  editor: any;

  editorOptions = {
    theme: 'vs-white',
    language: 'json',
  };
  monacoEditorHeight = '80vh';

  monacoForm: FormGroup = new FormGroup({
    code: new FormControl(''),
  });

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const sourceCodeChanges = changes as any;
    if (sourceCodeChanges && sourceCodeChanges?.sourceCodeConfig) {
      const sourceCodeConfig: SourceCodeConfig =
        sourceCodeChanges?.sourceCodeConfig?.currentValue;

      this.code =
        sourceCodeConfig && sourceCodeConfig.snippet
          ? JSON.stringify(sourceCodeConfig.snippet)
          : '';
    }
  }

  ngOnInit(): void {}

  onEditorInit(editor: any) {
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
      editor.getAction('editor.action.format')?.run();

      editor.focus();
      let line = editor.getPosition();
    }, 100);
  }

  onClose() {
    this.cancel.emit(false);
  }
}
