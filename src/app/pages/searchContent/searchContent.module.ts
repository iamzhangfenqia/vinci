import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import {DetailModalComponent} from './detailModal/detailmodal.component';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    RouterModule,
  ],
  declarations: [DetailModalComponent],
})
/*export class DashboardModule { }*/
export class SearchContentModule { }
