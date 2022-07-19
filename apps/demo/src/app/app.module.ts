import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { D2DashboardModule } from '@iapps/d2-dashboard';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MonacoEditorModule.forRoot(),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    SharedModule,
    NgxDhis2HttpClientModule.forRoot({
      namespace: 'iapps',
      version: 1,
      models: {
        users: 'id',
        organisationUnitLevels: 'id,level',
        organisationUnits: 'id,name,level',
        organisationUnitGroups: 'id',
      },
    }),
    D2DashboardModule.forRoot({
      useDataStore: true,
      dataStoreNamespace: 'eidsr-dashboard',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}