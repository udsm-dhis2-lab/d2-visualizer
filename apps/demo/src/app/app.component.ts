import { Component, OnInit } from '@angular/core';
import { D2Visualizer } from '@iapps/d2-visualizer';
import { Fn } from '@iapps/function-analytics';

@Component({
  selector: 'iapps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo';

  html = ``;

  ngOnInit(): void {
    // Initializer for D2 Visualizer
    // const visualizer = new D2Visualizer().setId('vis').draw();
    if (Fn) {
      Fn.init({
        baseUrl: '../../../api/',
      });
    }
  }
}
