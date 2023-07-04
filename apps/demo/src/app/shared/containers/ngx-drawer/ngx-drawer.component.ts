import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SourceCodeConfig } from '../../../pages/chart/models/source-code.model';

declare const monaco: any;

@Component({
  selector: 'iapps-ngx-drawer',
  templateUrl: './ngx-drawer.component.html',
  styleUrls: ['./ngx-drawer.component.scss'],
})
export class NgxDrawerComponent implements OnInit, OnChanges {
  @Input() isInfoOpen = false;
  @Input() sourceCodeConfig: any;
  @Input() code = '';

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
        this.sourceCodeConfig?.language === 'json'
          ? sourceCodeConfig && sourceCodeConfig?.snippet
            ? JSON.stringify(sourceCodeConfig?.snippet)
            : ''
          : sourceCodeConfig?.snippet;
    }

    this.editorOptions = {
      theme: this.sourceCodeConfig?.theme
        ? this.sourceCodeConfig?.theme
        : 'vs-white',
      language: this.sourceCodeConfig?.language
        ? this.sourceCodeConfig?.language
        : 'json',
    };
  }

  ngOnInit(): void {}

  onEditorInit(editor: any) {
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
      editor.getAction('editor.action.format')?.run();

      editor.focus();
      const line = editor.getPosition();
    }, 100);
  }

  onClose() {
    this.cancel.emit(false);
  }
}