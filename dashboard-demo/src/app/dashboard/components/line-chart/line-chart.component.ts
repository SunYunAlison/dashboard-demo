import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SensorInfo } from '../../model';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
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
export class LineChartComponent implements OnInit, OnDestroy {

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
    this.value = 30 + (Math.random()-0.5)*30 ;
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
      visualMap: {
        show:false,
        top: 50,
        right: 10,
        pieces: [
          {
            gt: 0,
            lte: 30,
            color: '#93CE07'
          },
          {
            gt: 30,
            lte: 40,
            color: '#FBDB0F'
          },
          {
            gt: 40,
            lte: 50,
            color: '#FC7D02'
          },
          {
            gt: 50,
            lte: 100,
            color: '#FD0100'
          }
        ],
        outOfRange: {
          color: '#AA069F'
        }
      },
      series: [{
        name: 'Mocking Data',
        type: 'line',
        showSymbol: false,
        emphasis: {
          line: false,
        },
        data: this.data
      }]
    };

  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}



