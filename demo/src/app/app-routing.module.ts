import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chart',
    pathMatch: 'full',
  },
  {
    path: 'chart',
    loadChildren: () =>
      import('../app/pages/chart/chart.module').then((m) => m.ChartModule),
  },
  {
    path: 'table',
    loadChildren: () =>
      import('../app/pages/table/table.module').then((m) => m.TableModule),
  },
  {
    path: 'map',
    loadChildren: () =>
      import('../app/pages/map/map.module').then((m) => m.MapModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
