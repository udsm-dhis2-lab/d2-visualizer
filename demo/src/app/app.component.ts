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

  ngOnInit(): void {
    // Initializer for D2 Visualizer
    // const visualizer = new D2Visualizer().setId('vis').draw();
    // Fn.init({
    //   baseUrl: 'https://play.dhis2.org/2.35.11/api/',
    //   username: 'admin',
    //   password: 'district',
    // });
  }
}
