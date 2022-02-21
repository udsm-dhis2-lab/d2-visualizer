import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { NgxToolbarComponent } from './containers/ngx-toolbar/ngx-toolbar.component';
import { RouterModule } from '@angular/router';
import { NgxDrawerComponent } from './containers/ngx-drawer/ngx-drawer.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NgxToolbarComponent, NgxDrawerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule,
    MonacoEditorModule,
  ],
  exports: [
    CoreModule,
    NgxToolbarComponent,
    NgxDrawerComponent,
    MonacoEditorModule,
  ],
})
export class SharedModule {}
