import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxEchartsModule } from "ngx-echarts";


import { DashboardComponent } from './dashboard.component';
import { MeterChartComponent } from './components/meter-chart/meter-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ClockComponent } from './components/clock/clock.component';
import { LineChart3Component } from './components/line-chart3/line-chart3.component';
import { AreaChartComponent } from './components/area-chart/area-chart.component';



@NgModule({
  declarations: [
    DashboardComponent,
    MeterChartComponent,
    LineChartComponent,
    ClockComponent,
    LineChart3Component,
    AreaChartComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MatGridListModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  exports: [
    DashboardComponent,
    MeterChartComponent
  ]
})
export class DashboardModule { }
