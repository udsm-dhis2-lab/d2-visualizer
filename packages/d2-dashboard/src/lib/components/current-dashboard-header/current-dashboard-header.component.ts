import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DashboardObject } from '../../models';

@Component({
  selector: 'iapps-current-dashboard-header',
  templateUrl: './current-dashboard-header.component.html',
  styleUrls: ['./current-dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentDashboardHeaderComponent implements OnInit {
  @Input() dashboard!: Partial<DashboardObject>;

  ngOnInit() {}
}
