import { Component, OnDestroy, OnInit, } from '@angular/core';
import { CdkDragDrop, moveItemInArray,  } from '@angular/cdk/drag-drop';

import { Subject } from 'rxjs';
import {SensorInfo } from '../dashboard/model';
import { MachineInfo } from "../dashboard-sum/model";

@Component({
  selector: 'app-dashboard-sum',
  templateUrl: './dashboard-sum.component.html',
  styleUrls: ['./dashboard-sum.component.scss']
})
export class DashboardSumComponent implements OnInit, OnDestroy {
  private readonly destroyed = new Subject<void>();


  sensorTemp:SensorInfo = {
    sensorId:'1',
    sensorName:'ss001',
    sensorStatus:'Online',
    updateTime:'',
  }

  sensorV:SensorInfo = {
    sensorId:'2',
    sensorName:'ss002',
    sensorStatus:'Online',
    updateTime:'',
  }

  sensorC:SensorInfo = {
    sensorId:'3',
    sensorName:'ss003',
    sensorStatus:'Online',
    updateTime:'',
  }

  machine1:MachineInfo = {
    machineId:'1',
    machineName:'me001',
    sensorInfo:[this.sensorC,this.sensorTemp,this.sensorV],
    updateTime:'',

  }

  machine2:MachineInfo = {
    machineId:'2',
    machineName:'me002',
    sensorInfo:[this.sensorC,this.sensorTemp,this.sensorV],
    updateTime:'',
  }

  machine3:MachineInfo = {
    machineId:'3',
    machineName:'me003',
    sensorInfo:[this.sensorC,this.sensorTemp,this.sensorV],
    updateTime:'',
  }

  cardList = [
    { machineId:'001', chartTitle: "Machine Information", type:"info-chart",cols: 1, rows: 1, data: [{}],machineInfo: this.machine1  },
    { machineId:'001', chartTitle: "Temperature", type:"meter-chart", cols: 1, rows: 1, data: [0], machineInfo: this.machine1},
    { machineId:'001', chartTitle: "Current", type:"meter-chart",cols: 1, rows: 1, data: [0], machineInfo: this.machine1},
    { machineId:'001', chartTitle: "Vibration", type:"meter-chart",cols: 1, rows: 1, data: [0], machineInfo: this.machine1 },
    { machineId:'002', chartTitle: "Machine Information", type:"info-chart",cols: 1, rows: 1, data: [{}],machineInfo: this.machine2  },
    { machineId:'002', chartTitle: "Temperature", type:"meter-chart", cols: 1, rows: 1, data: [0], machineInfo: this.machine2},
    { machineId:'002', chartTitle: "Current", type:"meter-chart",cols: 1, rows: 1, data: [0], machineInfo: this.machine2},
    { machineId:'002', chartTitle: "Vibration", type:"meter-chart",cols: 1, rows: 1, data: [0], machineInfo: this.machine2 },
    { machineId:'003', chartTitle: "Machine Information", type:"info-chart",cols: 1, rows: 1, data: [{}],machineInfo: this.machine3  },
    { machineId:'003', chartTitle: "Temperature", type:"meter-chart", cols: 1, rows: 1, data: [0], machineInfo: this.machine3},
    { machineId:'003', chartTitle: "Current", type:"meter-chart",cols: 1, rows: 1, data: [0], machineInfo: this.machine3},
    { machineId:'003', chartTitle: "Vibration", type:"meter-chart",cols: 1, rows: 1, data: [0], machineInfo: this.machine3 },
   
  ];

  constructor() { }

  ngOnInit(): void {
    this.generateRandomData();
  }

  
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.cardList, event.previousIndex, event.currentIndex);
  }

  generateRandomData() {
    setInterval(()=>{
      let random_v1 = +(Math.random() * 50).toFixed(2);
      let random_t1 = +(Math.random() * 50).toFixed(2);
      let random_c1 = +(Math.random() * 5).toFixed(2);
      let random_v2 = +(Math.random() * 50).toFixed(2);
      let random_t2 = +(Math.random() * 50).toFixed(2);
      let random_c2 = +(Math.random() * 5).toFixed(2);
      let random_v3 = +(Math.random() * 50).toFixed(2);
      let random_t3 = +(Math.random() * 50).toFixed(2);
      let random_c3 = +(Math.random() * 5).toFixed(2);
      let index_v1 = this.cardList.findIndex((x)=>x.chartTitle === 'Vibration' && x.machineId === '001');
      let index_t1 = this.cardList.findIndex((x)=> x.chartTitle === 'Temperature' && x.machineId === '001');
      let index_c1 = this.cardList.findIndex((x)=> x.chartTitle === 'Current' && x.machineId === '001');
      let index_v2 = this.cardList.findIndex((x)=>x.chartTitle === 'Vibration' && x.machineId === '002');
      let index_t2 = this.cardList.findIndex((x)=> x.chartTitle === 'Temperature' && x.machineId === '002');
      let index_c2 = this.cardList.findIndex((x)=> x.chartTitle === 'Current' && x.machineId === '002');
      let index_v3 = this.cardList.findIndex((x)=>x.chartTitle === 'Vibration' && x.machineId === '003');
      let index_t3 = this.cardList.findIndex((x)=> x.chartTitle === 'Temperature' && x.machineId === '003');
      let index_c3 = this.cardList.findIndex((x)=> x.chartTitle === 'Current' && x.machineId === '003');
      this.cardList[index_v1].data = [random_v1];
      this.cardList[index_t1].data = [random_t1];
      this.cardList[index_c1].data = [random_c1];
      this.cardList[index_v2].data = [random_v2];
      this.cardList[index_t2].data = [random_t2];
      this.cardList[index_c2].data = [random_c2];
      this.cardList[index_v3].data = [random_v3];
      this.cardList[index_t3].data = [random_t3];
      this.cardList[index_c3].data = [random_c3];
    },1000);
  }


  ngOnDestroy() {
    this.destroyed.next(undefined);
    this.destroyed.complete();
  }

}
