import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as _ from 'lodash';
import { menuConfigs } from '../../config/menu.config';
import { MenuConfig } from '../../model/menu.model';

@Component({
  selector: 'iapps-ngx-toolbar',
  templateUrl: './ngx-toolbar.component.html',
  styleUrls: ['./ngx-toolbar.component.scss'],
})
export class NgxToolbarComponent implements OnInit {
  menuConfigs: MenuConfig[] = menuConfigs;
  selectedMenuConfig: string = (_.head(menuConfigs) as MenuConfig)?.name;
  appIcon = 'assets/images/logo.png';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedMenuConfig = this.getMenuConfigName();
  }

  getNavigationUrl() {
    return _.trim(_.last(_.split(window.location.href, '/')));
  }

  getMenuConfigName(): string {
    return _.head(
      _.filter(menuConfigs, (menuConfig: MenuConfig) => {
        return _.trim(menuConfig.route) === _.trim(this.getNavigationUrl());
      })
    )?.name as string;
  }

  onSelectionChange(menuName: string) {
    this.selectedMenuConfig = menuName;
    const menuConfig = this.getSelectedMenu(menuName);
    this.router.navigate(['./', menuConfig?.route]);
  }

  getSelectedMenu(menuName: string) {
    return _.head(
      _.filter(this.menuConfigs, (menuConfig: MenuConfig) => {
        return menuConfig.name === menuName;
      })
    );
  }
}
