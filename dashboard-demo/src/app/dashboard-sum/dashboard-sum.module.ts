import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxEchartsModule } from "ngx-echarts";
import * as echarts from 'echarts';

import { DashboardSumRoutingModule } from './dashboard-sum-routing.module';
import { DashboardSumComponent } from './dashboard-sum.component';
import { MeterChartComponent } from './components/meter-chart/meter-chart.component';
import { InfoChartComponent } from './components/info-chart/info-chart.component';


@NgModule({
  declarations: [
    DashboardSumComponent,
    MeterChartComponent,
    InfoChartComponent
  ],
  imports: [
    CommonModule,
    DashboardSumRoutingModule,
    DragDropModule,
    MatGridListModule,
    NgxEchartsModule.forRoot({
      echarts,
    })
  ]
})
export class DashboardSumModule { }
