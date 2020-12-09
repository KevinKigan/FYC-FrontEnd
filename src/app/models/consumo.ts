import {ConsumoNormal} from './consumoNormal';
import {ConsumoAlternativo} from './consumoAlternativo';
import {ConsumoElectrico} from './consumoElectrico';

export class Consumo{
  idConsumo: number;
  idConsumoNormal: ConsumoNormal;
  idConsumoAlternativo: ConsumoAlternativo;
  idConsumoElectrico: ConsumoElectrico;
}
