/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'iapps-ngx-d2-map',
  templateUrl: './ngx-d2-map.component.html',
  styleUrls: ['./ngx-d2-map.component.scss'],
})
export class NgxD2MapComponent implements OnInit {
  @Input() container = '';

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {}
}
