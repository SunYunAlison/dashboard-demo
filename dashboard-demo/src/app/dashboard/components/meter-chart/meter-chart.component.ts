import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SensorInfo } from '../../model';


@Component({
  selector: 'app-meter-chart',
  templateUrl: './meter-chart.component.html',
  styleUrls: ['./meter-chart.component.scss'],
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
export class MeterChartComponent implements OnInit {

  @Input() chartTitle!: string;
  @Input() chartData!: any[];
  @Input() sensorInfo!:SensorInfo;

  public echartOption: any;
  public echartOption2: any;

  title: string = '';
  data: any[] = [];
  sensor!:SensorInfo;

  splitNumber!: number;
  max!: number;
  min!: number;
  formatter: string = '{value} °C';
  color: string = '#FD7347'
  colorLight: string = '#FFAB91'
  color1:string = '#47fd9f'
  color2:string = '#fbff85'
  color3:string = '#FD7347'



  flip: string = 'inactive';
  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  constructor() { }

  ngOnInit() {
    this.sensor = this.sensorInfo;
    this.title = this.chartTitle;
    this.data = this.chartData;
    if (this.title === 'Current') {
      this.draw3StageMeterChart(this.data);
    }
    else {
      this.draw1StageMeterChart(this.data);
    }
  }

  ngOnChanges(changes: SimpleChange) {
    this.data = this.chartData;
    if (this.title === 'Current') {
      this.draw3StageMeterChart(this.data);
    }
    else {
      this.draw1StageMeterChart(this.data);
    }
  }
  private draw1StageMeterChart(data: any[]) {
    if (this.chartTitle == 'Vibration') {
      this.splitNumber = 10;
      this.max = 100;
      this.min = 0;
      this.formatter = '{value} mm ';
    }
    else {
      this.splitNumber = 12;
      this.max = 60;
      this.min = 0;
    }
    if (data[0] < (this.max - this.min) / 2) {
      this.color = '#47fd9f';
      this.colorLight = '#96ffc9'
    }
    else {
      this.color = '#FD7347';
      this.colorLight = '#FFAB91';
    }

    this.echartOption = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: this.min,
          max: this.max,
          splitNumber: this.splitNumber,
          itemStyle: {
            color: this.colorLight
          },
          progress: {
            show: true,
            width: 18
          },

          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 15
            }
          },
          axisTick: {
            distance: -22.5,
            splitNumber: this.splitNumber,
            lineStyle: {
              width: 2,
              color: '#999'
            }
          },
          splitLine: {
            distance: -26,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999'
            }
          },
          axisLabel: {
            distance: -10,
            color: '#999',
            fontSize: 10
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 20,
            borderRadius: 8,
            offsetCenter: [0, '15%'],
            fontSize: 25,
            fontWeight: 'bolder',
            formatter: this.formatter,
            color: this.color
          },
          data: [
            {
              value: data[0],
            }
          ]
        },

        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: this.min,
          max: this.max,
          itemStyle: {
            color: this.color
          },
          progress: {
            show: true,
            width: 8
          },

          pointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          },
          data: [
            {
              value: data[0],
            }
          ]
        }
      ]
    };

  }

  private draw3StageMeterChart(data: any[]) {
    if (this.title === 'Current') {
      this.formatter = '{value} A ';
      this.min = 0;
      this.max = 5;
    }
    this.echartOption2 = {
      series: [
        {
          type: 'gauge',
          min: this.min,
          max: this.max,
          axisLine: {
            lineStyle: {
              width: 15,
              color: [
                [0.3, this.color3],
                [0.7, this.color2],
                [1, this.color1]
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -15,
            length: 8,
            lineStyle: {
              color: '#fff',
              width: 0.5
            }
          },
          splitLine: {
            distance: -15,
            length: 15,
            lineStyle: {
              color: '#fff',
              width: 1
            }
          },
          axisLabel: {
            color: 'auto',
            distance: -15,
            fontSize: 10
          },
          detail: {
            valueAnimation: true,
            formatter: this.formatter,
            color: 'auto',
            fontSize: 25,
          },
          data: [
            {
              value: this.data[0]
            }
          ]
        }
      ]
    };
  }



}
