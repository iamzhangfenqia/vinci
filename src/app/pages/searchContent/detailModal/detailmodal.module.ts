import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {DetailModalComponent} from './detailmodal.component';


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    RouterModule,
  ],
  declarations: [DetailModalComponent],
})
/*export class DashboardModule { }*/
export class DetailModule { }
