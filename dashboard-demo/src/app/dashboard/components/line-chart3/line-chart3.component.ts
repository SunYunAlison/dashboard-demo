import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SensorInfo } from '../../model';

@Component({
  selector: 'app-line-chart3',
  templateUrl: './line-chart3.component.html',
  styleUrls: ['./line-chart3.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0deg)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in')),
    ])
  ]
})
export class LineChart3Component implements OnInit, OnDestroy {

  @Input() chartTitle!: string;
  @Input() chartData!: any[];
  // @Input() chartDataX!: any[];
  // @Input() chartDataY!: any[];
  // @Input() chartDataZ!: any[];
  @Input() sensorInfo!: SensorInfo;

  title: string = '';
  inputData: any[] = [];
  sensor!: SensorInfo;

  options: any;
  updateOptions: any;
  private oneDay = 1000;
  private now!: Date;
  private value: number = 30;
  private dataX: any[]=[];
  private dataY: any[]=[];
  private dataZ: any[]=[];
  private timer: any;

  flip: string = 'inactive';
  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  constructor() { }

  ngOnChanges() {
    this.sensor = this.sensorInfo
    this.title = this.chartTitle;

    if ( this.chartData.length == 3) {
      this.inputData = this.chartData;
      if (this.dataX  && this.dataX.length >= 1000) {
        this.dataX.shift();
        this.dataY.shift();
        this.dataZ.shift();
      }
      this.dataX.push(this.inputData[0]);
      this.dataY.push(this.inputData[1]);
      this.dataZ.push(this.inputData[2]);
      this.updateOptions = {
        series: [
          {
            data: this.dataX
          },
          {
            data: this.dataY
          },
          {
            data: this.dataZ
          },
        ]
      };
    }

  }


    ngOnInit(): void {


      this.options = {
        title: {
          show: false,
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params: any) => {
            params = params[0];
            const date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' - ' + [date.getHours(), date.getMinutes() + 1, date.getSeconds()].join(':') + ' - ' + params.value[1];
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          formatter: '{yyyy}-{MM}-{dd} {hh}:{mm}:{ss}',
          boundaryGap: false,
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
        },
        toolbox: {
          right: 80,
          top: 5,
          feature: {
            saveAsImage: {},
          },
        },
        series: [
          {
            name: 'VibrationX',
            type: 'line',
            showSymbol: false,
            emphasis: {
              line: false,
            },
            data: this.dataX
          },
          {
            name: 'VibrationY',
            type: 'line',
            showSymbol: false,
            emphasis: {
              line: false,
            },
            data: this.dataY
          },
          {
            name: 'VibrationZ',
            type: 'line',
            showSymbol: false,
            emphasis: {
              line: false,
            },
            data: this.dataZ
          },
        ]
      };

    }

    ngOnDestroy(){ }

  }
