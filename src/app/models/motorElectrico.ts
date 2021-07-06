import {PotenciaElectrica} from './potenciaElectrica';
import {HP_Electrico} from './HP_Electrico';

export class MotorElectrico{
  idMotorElectrico: number;
  tCarga220v: number;
  potenciasElectricas: PotenciaElectrica [];
  hps: HP_Electrico [];
}
