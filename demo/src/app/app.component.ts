import { Component, OnInit } from '@angular/core';
import { D2Visualizer } from '@iapps/d2-visualizer';

@Component({
  selector: 'iapps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo';

  ngOnInit(): void {
    const visualizer = new D2Visualizer().setId('vis').draw();
  }
}
