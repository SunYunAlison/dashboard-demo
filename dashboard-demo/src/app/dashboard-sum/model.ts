import { SensorInfo } from "../dashboard/model";
export class MachineInfo {
    machineId:string ='';
    machineName:string ='';
    sensorInfo:SensorInfo[] = [];
    updateTime:string ='';
}