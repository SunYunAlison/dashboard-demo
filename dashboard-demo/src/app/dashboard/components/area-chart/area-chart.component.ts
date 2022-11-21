import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SensorInfo } from '../../model';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
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
export class AreaChartComponent implements OnInit, OnDestroy {
  @Input() chartTitle!: string;
  @Input() chartData!: any[];
  @Input() sensorInfo!: SensorInfo;

  title: string = '';
  inputData: any;
  sensor!: SensorInfo;

  options: any;
  updateOptions: any;
  private oneDay =  1000;
  private now!: Date;
  private value: number = 30;
  private data!: any[];
  private timer: any;

  flip: string = 'inactive';
  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  constructor() { }

  randomData() {  
    this.now = new Date(this.now.getTime() + this.oneDay);
    this.value = 4.6 + (Math.random()-0.5) ;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('-') + ' ' + [this.now.getHours(), this.now.getMinutes(), this.now.getSeconds()].join(':'),
        Math.round(this.value)
      ]
    };
  }

  getRandomData() {
    this.data = [];
    for(let i = 0; i<1000; i++) {
      this.data.push(this.randomData());
    }
  }

  ngOnChanges() {
    this.sensor = this.sensorInfo
    this.title = this.chartTitle;
    if (this.data && this.chartData[0] != '') {
      this.inputData = this.chartData[0];
      if ( this.data.length >= 1000) {
        this.data.shift();
      }
      this.data.push(this.inputData);
      this.updateOptions = {
        series: [{
          data: this.data
        }]
      };
    }
    console.log(this.data)
  }

  ngOnInit(): void {
    this.now = new Date();
    this.now = new Date (this.now.getTime() - 1000*1000);
    this.getRandomData();
    //echart options
    this.options = {
      title: {
        show:false,
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          params = params[0];
          const date = new Date(params.name);
          return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' - ' + [date.getHours(), date.getMinutes() + 1, date.getSeconds()].join(':')+ ' - ' + params.value[1];
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
        top:5,
        feature: {
          saveAsImage: {},
        },
      },

      series: [{
        name: 'Mocking Data',
        type: 'line',
        showSymbol: false,
        // emphasis: {
        //   line: false,
        // },
        // itemStyle: {
        //   color: 'rgb(255, 70, 131)'
        // },
        smooth: true,
        lineStyle: {
          color: 'rgba(183, 240, 193, 1)',
          width: 0.5
        },
        areaStyle: {
          // color:'#93CE07'
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'rgba(183, 240, 193, 1)' // color at 0%
            }, {
                offset: 1, color: 'rgba(183, 240, 193, 0.1)' // color at 100%
            }],
            global: false // default is false
          }
        },
        data: this.data
      }]
    };
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
