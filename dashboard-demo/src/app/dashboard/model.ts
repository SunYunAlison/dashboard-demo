export class SensorInfo {
    sensorId:string ='';
    sensorName:string ='';
    sensorStatus:string ='';
    updateTime:string ='';
}

export class CurrTime {
    hour:number = 0;
    minute:number = 0;
    second:number = 0;
}

export interface  DataItem {
    name: string;
    value: [string, number];
  }
