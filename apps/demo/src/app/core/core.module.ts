import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDeps } from './deps/material.config';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MaterialDeps],
})
export class CoreModule {}
