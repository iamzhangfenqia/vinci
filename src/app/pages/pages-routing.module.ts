import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {SearchContentComponent} from './searchContent/searchContent.component';
import {SearchGuard} from './guard/search.guard';
import {AnalyseComponent} from './analyse/analyse.component';
import {DetailAnalyseComponent} from './detailAnalyse/detailAnalyse.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'analyseDetail/:safeUrl',
    component: DetailAnalyseComponent,
  }, {
    path: 'analyse',
    component: AnalyseComponent,
  }, {
    path: 'searchcontent/:searchUrl',
    component: SearchContentComponent,
    /* canActivate: [SearchGuard],*/
  }, {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'components',
    loadChildren: './components/components.module#ComponentsModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SearchGuard],
})
export class PagesRoutingModule {
}
