import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {DetailAnalyseComponent} from './detailAnalyse.component';


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    RouterModule,
  ],
  declarations: [DetailAnalyseComponent],
})
/*export class DashboardModule { }*/
export class DetailAnalyseModule { }
