import {Sobrealimentacion} from './sobrealimentacion';
import {Combustible} from './combustible';
import {Emisiones} from './emisiones';

export class MotorCombustion{
  idMotorCombustion: number;
  cilindros: number;
  cilindrada: number;
  sobrealimentacion: Sobrealimentacion;
  combustible: Combustible;
  emisiones: Emisiones;
  hp: number;

}
