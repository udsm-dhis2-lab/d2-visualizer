import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
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
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../app/pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
