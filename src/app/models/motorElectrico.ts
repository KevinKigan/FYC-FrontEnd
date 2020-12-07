import {PotenciaElectrica} from './potenciaElectrica';
import {HP_Electrico} from './HP_Electrico';

export class MotorElectrico{
  idMotorElectrico: number;
  tCarga220v: number;
  potenciasElectricas: Array<PotenciaElectrica> []
  hps: Array<HP_Electrico> [];
}
