
import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { CdkDragDrop, moveItemInArray,  } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from "@angular/router";

import { Subject } from 'rxjs';
import { CurrTime, SensorInfo } from './model';
import { ArrayType } from '@angular/compiler';
interface DataItem {
  name: string;
  value: [string, number];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})




export class DashboardComponent implements OnInit, OnDestroy {
  private readonly destroyed = new Subject<void>();
  
  tempData : any[] = [];
  timer: any;
  
  machineId:string='';
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

  cardList = [
    { chartTitle: "Machine", type:"clock",cols: 1, rows: 1, data: [{}],sensorInfo: this.sensorTemp  },
    { chartTitle: "Temperature", type:"meter-chart", cols: 1, rows: 1, data: [0], sensorInfo: this.sensorTemp},
    { chartTitle: "Current", type:"meter-chart",cols: 1, rows: 1, data: [0], sensorInfo: this.sensorC},
    { chartTitle: "Vibration", type:"meter-chart",cols: 1, rows: 1, data: [0], sensorInfo: this.sensorV },
    { chartTitle: "Temperature", type:"line-chart",cols: 2, rows: 1, data: this.tempData,sensorInfo: this.sensorTemp },
    { chartTitle: "Vibration", type:"line-chart3",cols: 2, rows: 1, data: [], sensorInfo: this.sensorTemp},
    { chartTitle: "Current", type:"area-chart",cols: 2, rows: 1, data: [], sensorInfo: this.sensorC },
    { chartTitle: "pending", type:"line-chart",cols: 2, rows: 1, data: [], sensorInfo: this.sensorV}
  ];

  currTime : CurrTime ={
    hour:0,
    minute:0,
    second:0
  }


  constructor(public router: ActivatedRoute) { 
  }

  ngDoCheck() {
    if (this.machineId != this.queryRouterParams()) {
      this.machineId = this.queryRouterParams();
    }
  }



  ngOnInit(): void {
    this.machineId = this.queryRouterParams();
    this.generateRandomData();
  }

  queryRouterParams(){
    let machineId = '';
    this.router.queryParams.subscribe(params =>{
      machineId = params['id'];
    });
    return machineId;
  }



  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.cardList, event.previousIndex, event.currentIndex);
  }

  generateRandomData() {
    this.timer = setInterval(()=>{
      let random_v = +(Math.random() * 50).toFixed(2);
      let random_t = +(Math.random() * 50).toFixed(2);
      let random_c = +(Math.random() * 5).toFixed(2);
      let index_v = this.cardList.findIndex((x)=>x.chartTitle === 'Vibration' && x.type ==='meter-chart');
      let index_t = this.cardList.findIndex((x)=> x.chartTitle === 'Temperature' && x.type ==='meter-chart');
      let index_c = this.cardList.findIndex((x)=> x.chartTitle === 'Current' && x.type ==='meter-chart');
      this.cardList[index_v].data = [random_v];
      this.cardList[index_t].data = [random_t];
      this.cardList[index_c].data = [random_c];

      let date = new Date();
      this.currTime.second  = date.getSeconds();
      this.currTime.minute = date.getMinutes();
      this.currTime.hour =  (date.getHours() % 12) + this.currTime.minute / 60;
      let index_clock = this.cardList.findIndex((x)=> x.chartTitle === 'Machine');
      this.cardList[index_clock].data = [this.currTime];

      let index_l_t = this.cardList.findIndex((x)=> x.chartTitle === 'Temperature' && x.type ==='line-chart');
      let data_l_t = {
        name: date.toString(),
        value: [
          [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':') ,
          random_t
      ]
      };
      this.cardList[index_l_t].data = [data_l_t];

      let index_l_v = this.cardList.findIndex((x)=> x.chartTitle === 'Vibration' && x.type ==='line-chart3');
      this.cardList[index_l_v].data = [
        {
          name: date.toString(),
          value: [
            [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':') ,
            (Math.random() * 50).toFixed(2)
        ]
        },
        {
          name: date.toString(),
          value: [
            [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':') ,
            (Math.random() * 50).toFixed(2)
        ]
        },
        {
          name: date.toString(),
          value: [
            [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':') ,
            (Math.random() * 50).toFixed(2)
        ]
        },
      ];

      let index_l_c = this.cardList.findIndex((x)=> x.chartTitle === 'Current' && x.type ==='area-chart');
      let data_l_c = {
        name: date.toString(),
        value: [
          [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':') ,
          random_c
      ]
      };
      this.cardList[index_l_c].data = [data_l_c];

    },1000);

    

  }



  ngOnDestroy() {
    clearInterval(this.timer);
    this.destroyed.next(undefined);
    this.destroyed.complete();
  }

}
