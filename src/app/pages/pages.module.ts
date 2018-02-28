import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import {SearchContentComponent} from './searchContent/searchContent.component';
import {FilterModalComponent} from './searchContent/filterModal/filtermodal.component';
import {DownloadModalComponent} from './searchContent/downloadModal/downloadmodal.component';
import {DetailModalComponent} from './searchContent/detailModal/detailmodal.component';
import {IframemodalComponent} from './searchContent/iframelModal/iframemodal.component';
import {AnalyseComponent} from './analyse/analyse.component';
import {AngularEchartsModule} from 'ngx-echarts';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    AngularEchartsModule,
  ],
  entryComponents: [FilterModalComponent, DownloadModalComponent, DetailModalComponent, IframemodalComponent],
  declarations: [
    ...PAGES_COMPONENTS,
    SearchContentComponent,
    FilterModalComponent,
    DownloadModalComponent,
    DetailModalComponent,
    IframemodalComponent,
    AnalyseComponent,
  ],
})
export class PagesModule {
}
