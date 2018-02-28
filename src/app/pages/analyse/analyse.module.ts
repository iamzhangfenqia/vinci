import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import {AnalyseComponent} from './analyse.component';


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
  ],
  declarations: [AnalyseComponent],
})
/*export class DashboardModule { }*/
export class AnalyseModule { }
