import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SensorInfo } from '../../../dashboard/model';
import { MachineInfo } from '../../model';

@Component({
  selector: 'app-info-chart',
  templateUrl: './info-chart.component.html',
  styleUrls: ['./info-chart.component.scss'],
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
export class InfoChartComponent implements OnInit {
  @Input() chartTitle!: string;
  @Input() chartData!: any[];
  @Input() machineInfo!:MachineInfo;

  title: string = '';
  data: any[] = [];
  machine!:MachineInfo;



  flip: string = 'inactive';
  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  constructor() { }

  ngOnInit(): void {
    this.machine = this.machineInfo;
    this.title = this.chartTitle;
    this.data = this.chartData;
  }

}
