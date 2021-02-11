import {Injectable} from '@angular/core';
import {ModelosComponent} from '../pages/modelos/modelos.component';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  constructor() {
  }

  public static MINIMO: string = '1';
  public static MAXIMO: string = '100000';
  public  static CUALQUIERA: string = 'Cualquiera';
  private filtro: boolean = false;
  private loading:boolean = true;

  private precio =
    {
      title: 'precio',
      minimo: '1',
      maximo: '1000000000'
    }
  ;
  private carroceria = {
    title: 'carroceria',
    value: FiltroService.CUALQUIERA
  };

  private motor = {
    title: 'motor',
    cilindrada: FiltroService.CUALQUIERA,
    cilindros: FiltroService.CUALQUIERA,
    sobrealimentacion: FiltroService.CUALQUIERA
  };
  private consumo = {
    title: 'consumo',
    value: FiltroService.CUALQUIERA
  };
  private potencia = {
    title: 'potencia',
    minimo: '1',
    maximo: '10000'
  };

  /**
   * Metodo para actualizar los precios en el filtro
   * si han cambiado de los valores por defecto
   *
   * @param submenus
   */
  setPrecio(submenus: any) {
    if (submenus[0].value != FiltroService.MINIMO || submenus[1].value != FiltroService.MAXIMO) {
      this.precio.minimo = submenus[0].value;
      this.precio.maximo = submenus[1].value;
      this.setFiltro(true);
    }
  }

  /**
   * Metodo para actualizar la potencia en el filtro
   * si han cambiado de los valores por defecto
   *
   * @param submenus
   */
  setPotencia(submenus: any) {
    if (submenus[0].value != FiltroService.MINIMO || submenus[1].value != FiltroService.MAXIMO) {
      this.potencia.minimo = submenus[0].value;
      this.potencia.maximo = submenus[1].value;
      this.setFiltro(true);
    }
  }

  /**
   * Metodo para actualizar la carroceria en el filtro
   * si han cambiado de los valores por defecto
   *
   * @param value
   */
  setCarroceria(value: any) {
    this.carroceria.value = value;
    if (this.carroceria.value != FiltroService.CUALQUIERA) {
      this.setFiltro(true);
    }
  }

  /**
   * Metodo para actualizar el motor en el filtro
   * si han cambiado de los valores por defecto
   *
   * @param submenus
   */
  setMotor(submenus: any) {
    this.motor.cilindrada = submenus[0].value;
    this.motor.cilindros = submenus[1].value;
    this.motor.sobrealimentacion = submenus[2].value;
    if (this.motor.cilindrada        != FiltroService.CUALQUIERA ||
        this.motor.cilindros         != FiltroService.CUALQUIERA ||
        this.motor.sobrealimentacion != FiltroService.CUALQUIERA) {
      this.setFiltro(true);
    }
  }

  /**
   * Metodo para actualizar el consumo en el filtro
   * si han cambiado de los valores por defecto
   *
   * @param submenus
   */
  setConsumo(submenus: any) {
    this.consumo.value = submenus[0].value;
    if (this.consumo.value != FiltroService.CUALQUIERA) {
      this.setFiltro(true);
    }
  }

  /**
   * Metodo para resetear los filtros
   *
   * @param filtro
   */
  reset(filtro: string) {
    if (filtro == 'todos') {
      this.setFiltro(false);
      this.precio.minimo           = FiltroService.MINIMO;
      this.precio.maximo           = FiltroService.MAXIMO;
      this.carroceria.value        = FiltroService.CUALQUIERA;
      this.consumo.value           = FiltroService.CUALQUIERA;
      this.potencia.minimo         = FiltroService.MINIMO;
      this.potencia.maximo         = FiltroService.MAXIMO;
      this.motor.sobrealimentacion = FiltroService.CUALQUIERA;
      this.motor.cilindrada        = FiltroService.CUALQUIERA;
      this.motor.cilindros         = FiltroService.CUALQUIERA;

    } else {
      switch (filtro) {
        case 'precio':
          this.precio.minimo           = FiltroService.MINIMO;
          this.precio.maximo           = FiltroService.MAXIMO;
          break;
        case 'carroceria':
          this.carroceria.value        = FiltroService.CUALQUIERA;
          break;
        case 'consumo':
          this.consumo.value           = FiltroService.CUALQUIERA;
          break;
        case 'motor':
          this.motor.sobrealimentacion = FiltroService.CUALQUIERA;
          this.motor.cilindrada        = FiltroService.CUALQUIERA;
          this.motor.cilindros         = FiltroService.CUALQUIERA;
          break;
        case 'potencia':
          this.potencia.minimo         = FiltroService.MINIMO;
          this.potencia.maximo         = FiltroService.MAXIMO;
          break;

      }
    }
  }

  /**
   * Metodo para obrener los filtros
   */
  getFiltros(): any {

    let filtro = [];
    if (this.comprobarFiltroPrecio()) {
      filtro[filtro.length] = this.precio;
    }
    if (this.comprobarFiltroCarroceria()) {
      filtro[filtro.length] = this.carroceria;
    }
    if (this.comprobarFiltroMotor()) {
      filtro[filtro.length] = this.motor;
    }
    if (this.comprobarFiltroConsumo()) {
      filtro[filtro.length] = this.consumo;
    }
    if (this.comprobarFiltroPotecia()) {
      filtro[filtro.length] = this.potencia;
    }

    // this.carroceria,
    // this.motor,
    // this.consumo,
    // this.potencia,
    return filtro;
  }

  /**
   * Metodo para comprobar si se quiere filtrar
   * por precio o esta inicializado por defecto
   *
   */
  comprobarFiltroPrecio(): boolean {
    return !(this.precio.minimo == FiltroService.MINIMO && this.precio.maximo == FiltroService.MAXIMO);
  }

  /**
   * Metodo para comprobar si se quiere filtrar
   * por potencia o esta inicializado por defecto
   *
   */
  comprobarFiltroPotecia(): boolean {
    return !(this.potencia.minimo == FiltroService.MINIMO && this.potencia.maximo == FiltroService.MAXIMO);
  }

  /**
   * Metodo para comprobar si se quiere filtrar
   * por carroceria o esta inicializada por defecto
   *
   */
  comprobarFiltroCarroceria(): boolean {
    return !(this.carroceria.value == FiltroService.CUALQUIERA);
  }

  /**
   * Metodo para comprobar si se quiere filtrar
   * por carroceria o esta inicializada por defecto
   *
   */
  comprobarFiltroConsumo(): boolean {
    return !(this.consumo.value == FiltroService.CUALQUIERA);
  }

  /**
   * Metodo para comprobar si se quiere filtrar
   * por motor o esta inicializado por defecto
   *
   */
  comprobarFiltroMotor(): boolean {
    return !(this.motor.cilindros         == FiltroService.CUALQUIERA &&
             this.motor.cilindrada        == FiltroService.CUALQUIERA &&
             this.motor.sobrealimentacion == FiltroService.CUALQUIERA)
  }

  private setFiltro(bool: boolean) {
    this.filtro = bool;
  }

  getFiltro(): boolean {
    return this.filtro;
  }

  getLoading():boolean{
    return this.loading;
  }
  setLoading(load:boolean){
    this.loading = load;
  }

}

