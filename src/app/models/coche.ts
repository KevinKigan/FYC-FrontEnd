import {Marca} from './marca';
import {Modelo} from './modelo';
import {Carroceria} from './carroceria';
import {TipoMotor} from './tipoMotor';
import {Consumo} from './consumo';


export class coche{
  idCoche: number;
  ejeMotriz: string;
  marca: Marca;
  modelo: Modelo;
  transmision: string;
  carroceria: Carroceria;
  tipoMotor: TipoMotor;
  caryear: number;
  precio: number;
  consumo: Consumo;
}
